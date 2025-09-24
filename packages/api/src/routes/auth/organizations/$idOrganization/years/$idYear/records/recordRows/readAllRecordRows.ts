import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectMany } from "#src/utilities/sql/selectMany.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readAllRecordRowsRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const readAllRecordRowsRoute = authFactory.createApp()
    .post(
        readAllRecordRowsRouteDefinition.path,
        bodyValidator(readAllRecordRowsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllRecordRows = await selectMany({
                database: c.var.clients.sql,
                table: models.recordRow,
                where: (table) => {
                    if (body.idRecord !== null && body.idRecord !== undefined) {
                        return (
                            and(
                                eq(table.idOrganization, body.idOrganization),
                                eq(table.idYear, body.idYear),
                                eq(table.idRecord, body.idRecord),
                            )
                        )
                    }
                    return (
                        and(
                            eq(table.idOrganization, body.idOrganization),
                            eq(table.idYear, body.idYear),
                        )
                    )
                }
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readAllRecordRowsRouteDefinition.schemas.return,
                data: readAllRecordRows,
            })
        }
    )