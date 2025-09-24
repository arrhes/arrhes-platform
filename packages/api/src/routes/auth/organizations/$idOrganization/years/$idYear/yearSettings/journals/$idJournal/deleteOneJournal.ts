import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { deleteOne } from "#src/utilities/sql/deleteOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { deleteOneJournalRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const deleteOneJournalRoute = authFactory.createApp()
    .post(
        deleteOneJournalRouteDefinition.path,
        bodyValidator(deleteOneJournalRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const deleteOneJournal = await deleteOne({
                database: c.var.clients.sql,
                table: models.journal,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idJournal),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: deleteOneJournalRouteDefinition.schemas.return,
                data: deleteOneJournal,
            })
        }
    )