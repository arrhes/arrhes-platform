import { authFactory } from "#src/factories/authFactory.js"
import { Exception } from "#src/utilities/exception.js"
import { response } from "#src/utilities/response.js"
import { deleteMany } from "#src/utilities/sql/deleteMany.js"
import { insertMany } from "#src/utilities/sql/insertMany.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { defaultJournals } from "@arrhes/schemas/components"
import { models } from "@arrhes/schemas/models"
import { generateJournalsRouteDefinition } from "@arrhes/schemas/routes"
import { generateId } from "@arrhes/schemas/utilities"
import { and, eq } from "drizzle-orm"


export const generateJournalsRoute = authFactory.createApp()
    .post(
        generateJournalsRouteDefinition.path,
        bodyValidator(generateJournalsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const generatedJournals = await c.var.clients.sql.transaction(async (tx) => {
                try {
                    const deletedJournals = await deleteMany({
                        database: tx,
                        table: models.journal,
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
                        internalMessage: "Failed to delete journals",
                        externalMessage: "Échec de la suppression des journaux",
                    })
                }

                let newJournals = defaultJournals.map((defaultJournal) => {
                    return ({
                        id: generateId(),
                        idOrganization: body.idOrganization,
                        idYear: body.idYear,
                        code: defaultJournal.code,
                        label: defaultJournal.label,
                        createdAt: new Date().toISOString(),
                        lastUpdatedAt: null,
                        createdBy: null,
                        lastUpdatedBy: null,
                    })
                })

                const generatedJournals = await insertMany({
                    database: tx,
                    table: models.journal,
                    data: newJournals,
                })

                return generatedJournals
            })

            return response({
                context: c,
                statusCode: 200,
                schema: generateJournalsRouteDefinition.schemas.return,
                data: generatedJournals,
            })
        }
    )