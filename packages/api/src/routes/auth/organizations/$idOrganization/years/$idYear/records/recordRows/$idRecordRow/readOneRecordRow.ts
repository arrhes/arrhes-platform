import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { selectOne } from "#/utilities/sql/selectOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { readOneRecordRowRouteDefinition } from "@arrhes/application-metadata/routes"
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