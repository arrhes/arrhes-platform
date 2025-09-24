import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { selectOne } from "#/utilities/sql/selectOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { readOneJournalRouteDefinition } from "@arrhes/metadata/routes"
import { and, eq } from "drizzle-orm"


export const readOneJournalRoute = authFactory.createApp()
    .post(
        readOneJournalRouteDefinition.path,
        bodyValidator(readOneJournalRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readOneJournal = await selectOne({
                database: c.var.clients.sql,
                table: models.journal,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idJournal)
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readOneJournalRouteDefinition.schemas.return,
                data: readOneJournal,
            })
        }
    )