import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { selectMany } from "#/utilities/sql/selectMany.js"
import { selectOne } from "#/utilities/sql/selectOne.js"
import { updateOne } from "#/utilities/sql/updateOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { balanceSheetColumn, balanceSheetFlow, defaultAssociationBalanceSheets, defaultCompanyBalanceSheets } from "@arrhes/metadata/components"
import { models } from "@arrhes/metadata/models"
import { connectAccountsToBalanceSheetsRouteDefinition } from "@arrhes/metadata/routes"
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
                for (const account of readAllAccounts) {
                    let newBalanceSheetColumn: (typeof balanceSheetColumn)[number] | undefined = undefined
                    let newBalanceSheetFlow: (typeof balanceSheetFlow)[number] | undefined = undefined

                    const defaultBalanceSheet = defaultBalanceSheets.find((defaultBalanceSheet) => {
                        const foundAccount = defaultBalanceSheet.accounts.find((defaultAccount) => defaultAccount.number.toString() === account.number)
                        if (foundAccount !== undefined) {
                            newBalanceSheetColumn = foundAccount.isAllowance
                                ? "amortization"
                                : "gross"
                            newBalanceSheetFlow = foundAccount.flow
                            return true
                        }
                        return false
                    })

                    if (defaultBalanceSheet === undefined) {
                        continue
                    }

                    const balanceSheet = readAllBalanceSheets.find((balanceSheet) => balanceSheet.number === defaultBalanceSheet.number.toString())
                    if (balanceSheet === undefined) {
                        continue
                    }

                    const updateOneAccount = await updateOne({
                        database: tx,
                        table: models.account,
                        data: {
                            idBalanceSheet: balanceSheet.id,
                            balanceSheetColumn: newBalanceSheetColumn,
                            balanceSheetFlow: newBalanceSheetFlow,
                            lastUpdatedAt: new Date().toISOString(),
                            lastUpdatedBy: c.var.user.id,
                        },
                        where: (table) => (
                            and(
                                eq(table.idOrganization, body.idOrganization),
                                eq(table.idYear, body.idYear),
                                eq(table.id, account.id),
                            )
                        )
                    })
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