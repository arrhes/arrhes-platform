import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectMany } from "#src/utilities/sql/selectMany.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readAllJournalsRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const readAllJournalsRoute = authFactory.createApp()
    .post(
        readAllJournalsRouteDefinition.path,
        bodyValidator(readAllJournalsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllJournals = await selectMany({
                database: c.var.clients.sql,
                table: models.journal,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readAllJournalsRouteDefinition.schemas.return,
                data: readAllJournals,
            })
        }
    )