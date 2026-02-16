import { models } from "@arrhes/application-metadata/models"
import { deleteOneRecordLabelRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../../../../utilities/sql/deleteOne.js"
import { bodyValidator } from "../../../../../../../../../validators/bodyValidator.js"

export const deleteOneRecordLabelRoute = authFactory
    .createApp()
    .post(
        deleteOneRecordLabelRouteDefinition.path,
        bodyValidator(deleteOneRecordLabelRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const deleteOneRecordLabel = await deleteOne({
                database: c.var.clients.sql,
                table: models.recordLabel,
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
                schema: deleteOneRecordLabelRouteDefinition.schemas.return,
                data: deleteOneRecordLabel,
            })
        },
    )
