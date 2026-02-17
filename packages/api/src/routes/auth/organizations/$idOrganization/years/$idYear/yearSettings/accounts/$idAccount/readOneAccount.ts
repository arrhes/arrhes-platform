import { models } from "@arrhes/application-metadata/models"
import { readOneAccountRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../../utilities/sql/selectOne.js"

export const readOneAccountRoute = authFactory.createApp().post(readOneAccountRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: readOneAccountRouteDefinition.schemas.body,
    })

    const readOneAccount = await selectOne({
        database: c.var.clients.sql,
        table: models.account,
        where: (table) =>
            and(
                eq(table.idOrganization, body.idOrganization),
                eq(table.idYear, body.idYear),
                eq(table.id, body.idAccount),
            ),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readOneAccountRouteDefinition.schemas.return,
        data: readOneAccount,
    })
})
