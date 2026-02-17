import { models } from "@arrhes/application-metadata/models"
import { deleteOneJournalRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../../../../utilities/sql/deleteOne.js"

export const deleteOneJournalRoute = authFactory.createApp().post(deleteOneJournalRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: deleteOneJournalRouteDefinition.schemas.body,
    })

    const deleteOneJournal = await deleteOne({
        database: c.var.clients.sql,
        table: models.journal,
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
        schema: deleteOneJournalRouteDefinition.schemas.return,
        data: deleteOneJournal,
    })
})
