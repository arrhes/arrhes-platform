import { models } from "@arrhes/application-metadata/models"
import { updateOneFileRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../utilities/sql/updateOne.js"

export const updateOneFileRoute = authFactory.createApp().post(updateOneFileRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateOneFileRouteDefinition.schemas.body,
    })

    const updateOneFile = await updateOne({
        database: c.var.clients.sql,
        table: models.file,
        data: {
            reference: body.reference,
            name: body.name,
            lastUpdatedAt: new Date().toISOString(),
            lastUpdatedBy: c.var.user.id,
        },
        where: (table) =>
            and(
                eq(table.idOrganization, body.idOrganization),
                eq(table.idYear, body.idYear),
                eq(table.id, body.idFile),
            ),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateOneFileRouteDefinition.schemas.return,
        data: updateOneFile,
    })
})
