import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../../utilities/sql/updateOne.js"
import { bodyValidator } from "../../../../../../../../../validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { updateOneJournalRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"


export const updateOneJournalRoute = authFactory.createApp()
    .post(
        updateOneJournalRouteDefinition.path,
        bodyValidator(updateOneJournalRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const updateOneJournal = await updateOne({
                database: c.var.clients.sql,
                table: models.journal,
                data: {
                    code: body.code,
                    label: body.label,
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
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
                schema: updateOneJournalRouteDefinition.schemas.return,
                data: updateOneJournal,
            })
        }
    )