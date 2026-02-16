import { models } from "@arrhes/application-metadata/models"
import { readAllRecordRowsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"

export const readAllRecordRowsRoute = authFactory
    .createApp()
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
                        return and(
                            eq(table.idOrganization, body.idOrganization),
                            eq(table.idYear, body.idYear),
                            eq(table.idRecord, body.idRecord),
                        )
                    }
                    return and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear))
                },
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readAllRecordRowsRouteDefinition.schemas.return,
                data: readAllRecordRows,
            })
        },
    )
