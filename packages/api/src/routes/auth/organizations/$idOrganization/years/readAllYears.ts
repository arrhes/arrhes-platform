import { models, readAllYearsRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { selectMany } from "../../../../../utilities/sql/selectMany.js"

export const readAllYearsRoute = apiFactory.createApp().post(readAllYearsRouteDefinition.path, async (c) => {
    await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readAllYearsRouteDefinition.schemas.body,
    })

    const readAllYears = await selectMany({
        database: c.var.clients.sql,
        table: models.year,
        where: (table) => and(eq(table.idOrganization, body.idOrganization)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readAllYearsRouteDefinition.schemas.return,
        data: readAllYears,
    })
})
