import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { updateOne } from "#src/utilities/sql/updateOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { closeYearRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq, not } from "drizzle-orm"


export const closeYearRoute = authFactory.createApp()
    .post(
        closeYearRouteDefinition.path,
        bodyValidator(closeYearRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const closeYear = await updateOne({
                database: c.var.clients.sql,
                table: models.year,
                data: {
                    isClosed: not(models.year.isClosed),
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
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
                schema: closeYearRouteDefinition.schemas.return,
                data: closeYear,
            })
        }
    )
