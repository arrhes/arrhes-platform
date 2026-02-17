import { models } from "@arrhes/application-metadata/models"
import { updateOneRecordLabelRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../../utilities/sql/updateOne.js"

export const updateOneRecordLabelRoute = authFactory
    .createApp()
    .post(updateOneRecordLabelRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateOneRecordLabelRouteDefinition.schemas.body,
        })

        const updateOneRecordLabel = await updateOne({
            database: c.var.clients.sql,
            table: models.recordLabel,
            data: {
                label: body.label,

                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: c.var.user.id,
            },
            where: (table) =>
                and(
                    eq(table.idOrganization, body.idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idRecordLabel),
                ),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateOneRecordLabelRouteDefinition.schemas.return,
            data: updateOneRecordLabel,
        })
    })
