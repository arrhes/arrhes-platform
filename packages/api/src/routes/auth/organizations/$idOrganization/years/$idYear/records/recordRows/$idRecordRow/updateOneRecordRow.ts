import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { updateOne } from "#src/utilities/sql/updateOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { updateOneRecordRowRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const updateOneRecordRowRoute = authFactory.createApp()
    .post(
        updateOneRecordRowRouteDefinition.path,
        bodyValidator(updateOneRecordRowRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const updatedRecordRow = await updateOne({
                database: c.var.clients.sql,
                table: models.recordRow,
                data: {
                    idRecord: body.idRecord,
                    idAccount: body.idAccount,
                    isComputed: body.isComputed,
                    label: body.label,
                    debit: body.debit,
                    credit: body.credit,
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
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
                schema: updateOneRecordRowRouteDefinition.schemas.return,
                data: updatedRecordRow,
            })
        }
    )