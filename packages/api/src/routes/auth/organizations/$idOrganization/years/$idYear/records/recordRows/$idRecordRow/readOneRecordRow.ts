import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { readOneRecordRowRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const readOneRecordRowRoute = authFactory.createApp()
    .post(
        readOneRecordRowRouteDefinition.path,
        bodyValidator(readOneRecordRowRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readOneRecordRow = await selectOne({
                database: c.var.clients.sql,
                table: models.recordRow,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idRecordRow),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readOneRecordRowRouteDefinition.schemas.return,
                data: readOneRecordRow,
            })
        }
    )