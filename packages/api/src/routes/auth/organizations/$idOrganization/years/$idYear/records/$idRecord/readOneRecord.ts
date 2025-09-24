import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readOneRecordRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const readOneRecordRoute = authFactory.createApp()
    .post(
        readOneRecordRouteDefinition.path,
        bodyValidator(readOneRecordRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readOneRecord = await selectOne({
                database: c.var.clients.sql,
                table: models.record,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idRecord),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readOneRecordRouteDefinition.schemas.return,
                data: readOneRecord,
            })
        }
    )