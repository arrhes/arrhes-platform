import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { Exception } from "../../../../../../../../utilities/exception.js"
import { response } from "../../../../../../../../utilities/response.js"
import { deleteMany } from "../../../../../../../../utilities/sql/deleteMany.js"
import { insertMany } from "../../../../../../../../utilities/sql/insertMany.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"
import { defaultComputations } from "@arrhes/application-metadata/components"
import { models } from "@arrhes/application-metadata/models"
import { generateComputationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { and, eq } from "drizzle-orm"


export const generateComputationsRoute = authFactory.createApp()
    .post(
        generateComputationsRouteDefinition.path,
        bodyValidator(generateComputationsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const generatedComputations = await c.var.clients.sql.transaction(async (tx) => {
                try {
                    const deletedComputations = await deleteMany({
                        database: tx,
                        table: models.computation,
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
                        internalMessage: "Failed to delete computations",
                        externalMessage: "Échec de la suppression des journaux",
                    })
                }

                const incomeStatements = await selectMany({
                    database: tx,
                    table: models.incomeStatement,
                    where: (table) => (
                        and(
                            eq(table.idOrganization, body.idOrganization),
                            eq(table.idYear, body.idYear)
                        )
                    )
                })

                const newComputationIncomeStatements: Array<(typeof models.computationIncomeStatement.$inferInsert)> = []
                let newComputations = defaultComputations.map((defaultComputation, defaultComputationIndex) => {
                    const newComputation = {
                        id: generateId(),
                        idOrganization: body.idOrganization,
                        idYear: body.idYear,
                        index: defaultComputationIndex,
                        number: defaultComputation.number.toString(),
                        label: defaultComputation.label,
                        createdAt: new Date().toISOString(),
                        lastUpdatedAt: null,
                        createdBy: null,
                        lastUpdatedBy: null,
                    }

                    defaultComputation.incomeStatements.forEach((_incomeStatement, index) => {
                        const incomeStatement = incomeStatements.find((x) => x.number === _incomeStatement.number.toString())

                        if (incomeStatement === undefined) {
                            return
                        }

                        newComputationIncomeStatements.push({
                            id: generateId(),
                            idOrganization: body.idOrganization,
                            idYear: body.idYear,
                            idComputation: newComputation.id,
                            idIncomeStatement: incomeStatement.id,
                            index: index,
                            operation: _incomeStatement.operation,
                            createdAt: new Date().toISOString(),
                        })
                    })

                    return newComputation
                })

                const generatedComputations = await insertMany({
                    database: tx,
                    table: models.computation,
                    data: newComputations,
                })

                const generatedComputationIncomeStatements = await insertMany({
                    database: tx,
                    table: models.computationIncomeStatement,
                    data: newComputationIncomeStatements,
                })

                return generatedComputations
            })


            return response({
                context: c,
                statusCode: 200,
                schema: generateComputationsRouteDefinition.schemas.return,
                data: generatedComputations,
            })
        }
    )