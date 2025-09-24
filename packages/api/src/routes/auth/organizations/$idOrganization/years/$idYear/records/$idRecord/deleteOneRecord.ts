import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { deleteOne } from "#src/utilities/sql/deleteOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { deleteOneRecordRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const deleteOneRecordRoute = authFactory.createApp()
    .post(
        deleteOneRecordRouteDefinition.path,
        bodyValidator(deleteOneRecordRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const deleteOneRecord = await deleteOne({
                database: c.var.clients.sql,
                table: models.record,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idRecord),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: deleteOneRecordRouteDefinition.schemas.return,
                data: deleteOneRecord,
            })
        }
    )