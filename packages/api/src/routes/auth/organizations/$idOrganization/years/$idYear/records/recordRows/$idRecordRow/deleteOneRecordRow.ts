import { models } from "@arrhes/application-metadata/models"
import { deleteOneRecordRowRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../../../../utilities/sql/deleteOne.js"

export const deleteOneRecordRowRoute = authFactory
    .createApp()
    .post(deleteOneRecordRowRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: deleteOneRecordRowRouteDefinition.schemas.body,
        })

        const deleteOneRecordRow = await deleteOne({
            database: c.var.clients.sql,
            table: models.recordRow,
            where: (table) =>
                and(
                    eq(table.idOrganization, body.idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idRecordRow),
                ),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: deleteOneRecordRowRouteDefinition.schemas.return,
            data: deleteOneRecordRow,
        })
    })
