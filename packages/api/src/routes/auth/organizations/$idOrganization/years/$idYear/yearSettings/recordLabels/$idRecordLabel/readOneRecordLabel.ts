import { models } from "@arrhes/application-metadata/models"
import { readOneRecordLabelRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../../utilities/sql/selectOne.js"

export const readOneRecordLabelRoute = authFactory
    .createApp()
    .post(readOneRecordLabelRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: readOneRecordLabelRouteDefinition.schemas.body,
        })

        const readOneRecordLabel = await selectOne({
            database: c.var.clients.sql,
            table: models.recordLabel,
            where: (table) =>
                and(
                    eq(table.idOrganization, body.idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idRecordLabel),
                ),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readOneRecordLabelRouteDefinition.schemas.return,
            data: readOneRecordLabel,
        })
    })
