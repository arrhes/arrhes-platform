import { models, readAllJournalsRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"

export const readAllJournalsRoute = apiFactory.createApp().post(readAllJournalsRouteDefinition.path, async (c) => {
    const { user } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readAllJournalsRouteDefinition.schemas.body,
    })

    const readAllJournals = await selectMany({
        database: c.var.clients.sql,
        table: models.journal,
        where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readAllJournalsRouteDefinition.schemas.return,
        data: readAllJournals,
    })
})
