import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { selectMany } from "#/utilities/sql/selectMany.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { readAllComputationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"


export const readAllComputationsRoute = authFactory.createApp()
    .post(
        readAllComputationsRouteDefinition.path,
        bodyValidator(readAllComputationsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllComputations = await selectMany({
                database: c.var.clients.sql,
                table: models.computation,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                    )
                ),
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readAllComputationsRouteDefinition.schemas.return,
                data: readAllComputations,
            })
        }
    )
