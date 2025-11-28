import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { updateOne } from "#/utilities/sql/updateOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { updateOneRecordLabelRouteDefinition } from "@arrhes/metadata/routes"
import { and, eq } from "drizzle-orm"


export const updateOneRecordLabelRoute = authFactory.createApp()
    .post(
        updateOneRecordLabelRouteDefinition.path,
        bodyValidator(updateOneRecordLabelRouteDefinition.schemas.body),
        async (c) => {

            const body = c.req.valid("json")

            const updateOneRecordLabel = await updateOne({
                database: c.var.clients.sql,
                table: models.recordLabel,
                data: {
                    label: body.label,

                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idRecordLabel),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: updateOneRecordLabelRouteDefinition.schemas.return,
                data: updateOneRecordLabel,
            })
        }
    )