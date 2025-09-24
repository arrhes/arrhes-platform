import { authFactory } from "#src/factories/authFactory.js"
import { Exception } from "#src/utilities/exception.js"
import { response } from "#src/utilities/response.js"
import { deleteMany } from "#src/utilities/sql/deleteMany.js"
import { insertMany } from "#src/utilities/sql/insertMany.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { defaultAssociationIncomeStatements, defaultCompanyIncomeStatements } from "@arrhes/schemas/components"
import { models } from "@arrhes/schemas/models"
import { generateIncomeStatementsRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { generateId } from "@arrhes/schemas/utilities"
import { and, eq } from "drizzle-orm"
import * as v from "valibot"


export const generateIncomeStatementsRoute = authFactory.createApp()
    .post(
        generateIncomeStatementsRouteDefinition.path,
        bodyValidator(generateIncomeStatementsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const generatedIncomeStatements = await c.var.clients.sql.transaction(async (tx) => {
                try {
                    const deletedIncomeStatements = await deleteMany({
                        database: tx,
                        table: models.incomeStatement,
                        where: (table) => (
                            and(
                                eq(table.idOrganization, body.idOrganization),
                                eq(table.idYear, body.idYear)
                            )
                        )
                    })
                }
                catch (error: unknown) {
                    throw new Exception({
                        internalMessage: "Failed to delete incomeStatements",
                        externalMessage: "Échec de la suppression des lignes de compte de résultat",
                    })
                }

                const organization = await selectOne({
                    database: tx,
                    table: models.organization,
                    where: (table) => (
                        eq(table.id, body.idOrganization)
                    )
                })
                const defaultIncomeStatements = (
                    (organization.scope === "association")
                        ? defaultAssociationIncomeStatements
                        : defaultCompanyIncomeStatements
                )


                const newIncomeStatements: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>> = []

                defaultIncomeStatements
                    .forEach((defaultIncomeStatement) => {
                        const incomeStatementParent = newIncomeStatements.find((newIncomeStatement) => {
                            return newIncomeStatement.number === defaultIncomeStatement.numberParent?.toString()
                        })
                        newIncomeStatements.push({
                            id: generateId(),
                            idOrganization: body.idOrganization,
                            idYear: body.idYear,
                            idIncomeStatementParent: incomeStatementParent?.id ?? null,
                            number: defaultIncomeStatement.number.toString(),
                            isDefault: true,
                            label: defaultIncomeStatement.label,
                            netAmountAdded: "0.00",
                            createdAt: new Date().toISOString(),
                            lastUpdatedAt: null,
                            createdBy: null,
                            lastUpdatedBy: null,
                        })
                    })


                const generatedIncomeStatements = await insertMany({
                    database: tx,
                    table: models.incomeStatement,
                    data: newIncomeStatements,
                })

                return generatedIncomeStatements
            })


            return response({
                context: c,
                statusCode: 200,
                schema: generateIncomeStatementsRouteDefinition.schemas.return,
                data: generatedIncomeStatements,
            })
        }
    )