import { authFactory } from "../../../../../factories/authFactory.js"
import { response } from "../../../../../utilities/response.js"
import { selectMany } from "../../../../../utilities/sql/selectMany.js"
import { bodyValidator } from "../../../../../validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { readAllYearsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"


export const readAllYearsRoute = authFactory.createApp()
    .post(
        readAllYearsRouteDefinition.path,
        bodyValidator(readAllYearsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllYears = await selectMany({
                database: c.var.clients.sql,
                table: models.year,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readAllYearsRouteDefinition.schemas.return,
                data: readAllYears,
            })
        }
    )
