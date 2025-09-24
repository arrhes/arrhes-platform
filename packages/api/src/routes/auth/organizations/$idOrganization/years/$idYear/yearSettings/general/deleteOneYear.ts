import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { deleteOne } from "#/utilities/sql/deleteOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { deleteOneYearRouteDefinition } from "@arrhes/metadata/routes"
import { and, eq } from "drizzle-orm"


export const deleteOneYearRoute = authFactory.createApp()
    .post(
        deleteOneYearRouteDefinition.path,
        bodyValidator(deleteOneYearRouteDefinition.schemas.body),
        async (c) => {

            const body = c.req.valid("json")

            const deleteOneYear = await deleteOne({
                database: c.var.clients.sql,
                table: models.year,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.id, body.idYear),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: deleteOneYearRouteDefinition.schemas.return,
                data: deleteOneYear,
            })
        }
    )
