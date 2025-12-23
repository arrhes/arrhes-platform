import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { selectMany } from "#/utilities/sql/selectMany.js"
import { selectOne } from "#/utilities/sql/selectOne.js"
import { updateOne } from "#/utilities/sql/updateOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { defaultAssociationBalanceSheets, defaultCompanyBalanceSheets } from "@arrhes/application-metadata/components"
import { models } from "@arrhes/application-metadata/models"
import { connectAccountsToBalanceSheetsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"


export const connectAccountsToBalanceSheetsRoute = authFactory.createApp()
    .post(
        connectAccountsToBalanceSheetsRouteDefinition.path,
        bodyValidator(connectAccountsToBalanceSheetsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllAccounts = await selectMany({
                database: c.var.clients.sql,
                table: models.account,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                    )
                )
            })

            const readAllBalanceSheets = await selectMany({
                database: c.var.clients.sql,
                table: models.balanceSheet,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                    )
                )
            })

            const organization = await selectOne({
                database: c.var.clients.sql,
                table: models.organization,
                where: (table) => (
                    eq(table.id, body.idOrganization)
                )
            })
            const defaultBalanceSheets = (
                (organization.scope === "association")
                    ? defaultAssociationBalanceSheets
                    : defaultCompanyBalanceSheets
            )

            const connectAccountsToBalanceSheets = await c.var.clients.sql.transaction(async (tx) => {
                for (const defaultBalanceSheet of defaultBalanceSheets) {
                    for (const defaultAccount of defaultBalanceSheet.accounts) {

                        const foundAccount = readAllAccounts.find((account) => {
                            return account.number === defaultAccount.number.toString()
                        })

                        if (foundAccount === undefined) {
                            console.log("foundAccount is undefined", defaultBalanceSheet.number, defaultAccount)
                            continue
                        }

                        const balanceSheet = readAllBalanceSheets.find((balanceSheet) => balanceSheet.number === defaultBalanceSheet.number.toString())
                        if (balanceSheet === undefined) {
                            console.log("balanceSheet is undefined", defaultBalanceSheet.number)
                            continue
                        }

                        const updateOneAccount = await updateOne({
                            database: tx,
                            table: models.account,
                            data: {
                                idBalanceSheetAsset: (defaultBalanceSheet.side === "asset")
                                    ? balanceSheet.id
                                    : undefined,
                                balanceSheetAssetColumn: (defaultBalanceSheet.side === "asset")
                                    ? (defaultAccount.isAmortization)
                                        ? "amortization"
                                        : "gross"
                                    : undefined,
                                balanceSheetAssetFlow: (defaultBalanceSheet.side === "asset")
                                    ? defaultAccount.flow
                                    : undefined,

                                idBalanceSheetLiability: (defaultBalanceSheet.side === "liability")
                                    ? balanceSheet.id
                                    : undefined,
                                balanceSheetLiabilityColumn: (defaultBalanceSheet.side === "liability")
                                    ? "net"
                                    : undefined,
                                balanceSheetLiabilityFlow: (defaultBalanceSheet.side === "liability")
                                    ? defaultAccount.flow
                                    : undefined,

                                lastUpdatedAt: new Date().toISOString(),
                                lastUpdatedBy: c.var.user.id,
                            },
                            where: (table) => (
                                and(
                                    eq(table.idOrganization, body.idOrganization),
                                    eq(table.idYear, body.idYear),
                                    eq(table.id, foundAccount.id),
                                )
                            )
                        })
                    }
                }
                for (const account of readAllAccounts) {


                    const defaultBalanceSheet = defaultBalanceSheets.find((defaultBalanceSheet) => {
                        const foundAccount = defaultBalanceSheet.accounts.find((defaultAccount) => defaultAccount.number.toString() === account.number)

                        return false
                    })

                    if (defaultBalanceSheet === undefined) {
                        continue
                    }

                    const balanceSheet = readAllBalanceSheets.find((balanceSheet) => balanceSheet.number === defaultBalanceSheet.number.toString())
                    if (balanceSheet === undefined) {
                        continue
                    }


                }
            })


            return response({
                context: c,
                statusCode: 200,
                schema: connectAccountsToBalanceSheetsRouteDefinition.schemas.return,
                data: {},
            })
        }
    )