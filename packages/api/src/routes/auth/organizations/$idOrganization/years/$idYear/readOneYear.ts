import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { selectOne } from "#/utilities/sql/selectOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { readOneYearRouteDefinition } from "@arrhes/metadata/routes"
import { and, eq } from "drizzle-orm"


export const readOneYearRoute = authFactory.createApp()
    .post(
        readOneYearRouteDefinition.path,
        bodyValidator(readOneYearRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readOneYear = await selectOne({
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
                schema: readOneYearRouteDefinition.schemas.return,
                data: readOneYear,
            })
        }
    )
