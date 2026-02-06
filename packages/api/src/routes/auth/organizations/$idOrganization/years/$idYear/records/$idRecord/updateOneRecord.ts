import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../utilities/sql/updateOne.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { updateOneRecordRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"


export const updateOneRecordRoute = authFactory.createApp()
    .post(
        updateOneRecordRouteDefinition.path,
        bodyValidator(updateOneRecordRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const updateRecord = await c.var.clients.sql.transaction(async (tx) => {
                const updateRecord = await updateOne({
                    database: tx,
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

                return updateRecord
            })

            return response({
                context: c,
                statusCode: 200,
                schema: updateOneRecordRouteDefinition.schemas.return,
                data: updateRecord,
            })
        }
    )