import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { deleteOne } from "#src/utilities/sql/deleteOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { deleteOneRecordRowRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const deleteOneRecordRowRoute = authFactory.createApp()
    .post(
        deleteOneRecordRowRouteDefinition.path,
        bodyValidator(deleteOneRecordRowRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const deleteOneRecordRow = await deleteOne({
                database: c.var.clients.sql,
                table: models.recordRow,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idRecordRow),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: deleteOneRecordRowRouteDefinition.schemas.return,
                data: deleteOneRecordRow,
            })
        }
    )