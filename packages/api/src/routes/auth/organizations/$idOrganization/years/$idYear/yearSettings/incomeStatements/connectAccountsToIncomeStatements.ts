import {
    defaultAssociationIncomeStatements,
    defaultCompanyIncomeStatements,
} from "@arrhes/application-metadata/components"
import { models } from "@arrhes/application-metadata/models"
import { connectAccountsToIncomeStatementsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../../../../utilities/sql/updateOne.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"

export const connectAccountsToIncomeStatementsRoute = authFactory
    .createApp()
    .post(
        connectAccountsToIncomeStatementsRouteDefinition.path,
        bodyValidator(connectAccountsToIncomeStatementsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllAccounts = await selectMany({
                database: c.var.clients.sql,
                table: models.account,
                where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear)),
            })

            const readAllIncomeStatements = await selectMany({
                database: c.var.clients.sql,
                table: models.incomeStatement,
                where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear)),
            })

            const organization = await selectOne({
                database: c.var.clients.sql,
                table: models.organization,
                where: (table) => eq(table.id, body.idOrganization),
            })
            const defaultIncomeStatements =
                organization.scope === "association"
                    ? defaultAssociationIncomeStatements
                    : defaultCompanyIncomeStatements

            const connectAccountsToIncomeStatements = await c.var.clients.sql.transaction(async (tx) => {
                for (const defaultIncomeStatement of defaultIncomeStatements) {
                    for (const defaultAccount of defaultIncomeStatement.accounts) {
                        const foundAccount = readAllAccounts.find((account) => {
                            return account.number === defaultAccount.toString()
                        })

                        if (foundAccount === undefined) {
                            console.log("foundAccount is undefined", defaultIncomeStatement.number, defaultAccount)
                            continue
                        }

                        const incomeStatement = readAllIncomeStatements.find(
                            (incomeStatement) => incomeStatement.number === defaultIncomeStatement.number.toString(),
                        )
                        if (incomeStatement === undefined) {
                            console.log("incomeStatement is undefined", defaultIncomeStatement.number)
                            continue
                        }

                        const updateOneAccount = await updateOne({
                            database: tx,
                            table: models.account,
                            data: {
                                idIncomeStatement: incomeStatement.id,
                                lastUpdatedAt: new Date().toISOString(),
                                lastUpdatedBy: c.var.user.id,
                            },
                            where: (table) =>
                                and(
                                    eq(table.idOrganization, body.idOrganization),
                                    eq(table.idYear, body.idYear),
                                    eq(table.id, foundAccount.id),
                                ),
                        })
                    }
                }
            })

            return response({
                context: c,
                statusCode: 200,
                schema: connectAccountsToIncomeStatementsRouteDefinition.schemas.return,
                data: {},
            })
        },
    )
