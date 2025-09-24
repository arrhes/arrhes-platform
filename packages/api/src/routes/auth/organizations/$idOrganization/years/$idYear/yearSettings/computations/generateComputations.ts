import { authFactory } from "#src/factories/authFactory.js"
import { Exception } from "#src/utilities/exception.js"
import { response } from "#src/utilities/response.js"
import { deleteMany } from "#src/utilities/sql/deleteMany.js"
import { insertMany } from "#src/utilities/sql/insertMany.js"
import { selectMany } from "#src/utilities/sql/selectMany.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { defaultComputations } from "@arrhes/schemas/components"
import { models } from "@arrhes/schemas/models"
import { generateComputationsRouteDefinition } from "@arrhes/schemas/routes"
import { generateId } from "@arrhes/schemas/utilities"
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
                let newComputations = defaultComputations.map((defaultComputation) => {
                    const newComputation = {
                        id: generateId(),
                        idOrganization: body.idOrganization,
                        idYear: body.idYear,
                        number: defaultComputation.number.toString(),
                        label: defaultComputation.label,
                        createdAt: new Date().toISOString(),
                        lastUpdatedAt: null,
                        createdBy: null,
                        lastUpdatedBy: null,
                    }

                    defaultComputation.incomeStatements.forEach((_incomeStatement) => {
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