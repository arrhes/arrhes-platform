import { models } from "@arrhes/application-metadata/models"
import { updateOneJournalRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../../utilities/sql/updateOne.js"

export const updateOneJournalRoute = authFactory.createApp().post(updateOneJournalRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateOneJournalRouteDefinition.schemas.body,
    })

    const updateOneJournal = await updateOne({
        database: c.var.clients.sql,
        table: models.journal,
        data: {
            code: body.code,
            label: body.label,
            lastUpdatedAt: new Date().toISOString(),
            lastUpdatedBy: c.var.user.id,
        },
        where: (table) =>
            and(
                eq(table.idOrganization, body.idOrganization),
                eq(table.idYear, body.idYear),
                eq(table.id, body.idJournal),
            ),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateOneJournalRouteDefinition.schemas.return,
        data: updateOneJournal,
    })
})
