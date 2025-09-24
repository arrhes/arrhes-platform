import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { updateOne } from "#src/utilities/sql/updateOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { updateOneRecordRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const updateOneRecordRoute = authFactory.createApp()
    .post(
        updateOneRecordRouteDefinition.path,
        bodyValidator(updateOneRecordRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const updateRecord = await updateOne({
                database: c.var.clients.sql,
                table: models.record,
                data: {
                    idJournal: body.idJournal,
                    idAttachment: body.idAttachment,
                    label: body.label,
                    date: body.date,
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
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
                schema: updateOneRecordRouteDefinition.schemas.return,
                data: updateRecord,
            })
        }
    )