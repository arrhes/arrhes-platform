import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { selectOne } from "#/utilities/sql/selectOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { readOneRecordLabelRouteDefinition } from "@arrhes/metadata/routes"
import { and, eq } from "drizzle-orm"


export const readOneRecordLabelRoute = authFactory.createApp()
    .post(
        readOneRecordLabelRouteDefinition.path,
        bodyValidator(readOneRecordLabelRouteDefinition.schemas.body),
        async (c) => {

            const body = c.req.valid("json")

            const readOneRecordLabel = await selectOne({
                database: c.var.clients.sql,
                table: models.recordLabel,
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idRecordLabel),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readOneRecordLabelRouteDefinition.schemas.return,
                data: readOneRecordLabel,
            })
        }
    )