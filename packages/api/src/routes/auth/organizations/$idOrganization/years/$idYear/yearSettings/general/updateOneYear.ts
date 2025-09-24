import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { updateOne } from "#/utilities/sql/updateOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { updateOneYearRouteDefinition } from "@arrhes/metadata/routes"
import { and, eq } from "drizzle-orm"


export const updateOneYearRoute = authFactory.createApp()
    .post(
        updateOneYearRouteDefinition.path,
        bodyValidator(updateOneYearRouteDefinition.schemas.body),
        async (c) => {

            const body = c.req.valid("json")

            const updateOneYear = await updateOne({
                database: c.var.clients.sql,
                table: models.year,
                data: {
                    idYearPrevious: body.idYearPrevious,
                    label: body.label,
                    startingAt: body.startingAt,
                    endingAt: body.endingAt,
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.id, body.idYear),
                    )
                ),
            })

            return response({
                context: c,
                statusCode: 200,
                schema: updateOneYearRouteDefinition.schemas.return,
                data: updateOneYear,
            })
        }
    )
