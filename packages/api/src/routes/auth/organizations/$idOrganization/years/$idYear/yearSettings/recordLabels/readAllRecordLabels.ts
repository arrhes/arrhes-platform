import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { readAllRecordLabelsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"


export const readAllRecordLabelsRoute = authFactory.createApp()
    .post(
        readAllRecordLabelsRouteDefinition.path,
        bodyValidator(readAllRecordLabelsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllRecordLabels = await selectMany({
                database: c.var.clients.sql,
                table: models.recordLabel,
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
                schema: readAllRecordLabelsRouteDefinition.schemas.return,
                data: readAllRecordLabels,
            })
        }
    )