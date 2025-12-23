import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { selectMany } from "#/utilities/sql/selectMany.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { readAllRecordsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"


export const readAllRecordsRoute = authFactory.createApp()
    .post(
        readAllRecordsRouteDefinition.path,
        bodyValidator(readAllRecordsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllRecords = await selectMany({
                database: c.var.clients.sql,
                table: models.record,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readAllRecordsRouteDefinition.schemas.return,
                data: readAllRecords,
            })
        }
    )