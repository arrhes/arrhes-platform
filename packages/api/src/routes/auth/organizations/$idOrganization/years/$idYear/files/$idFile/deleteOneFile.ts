import { models } from "@arrhes/application-metadata/models"
import { deleteOneFileRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../../../utilities/sql/deleteOne.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"
import { deleteObject } from "../../../../../../../../utilities/storage/deleteObject.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"

export const deleteOneFileRoute = authFactory
    .createApp()
    .post(deleteOneFileRouteDefinition.path, bodyValidator(deleteOneFileRouteDefinition.schemas.body), async (c) => {
        const body = c.req.valid("json")

        const readOneFile = await selectOne({
            database: c.var.clients.sql,
            table: models.file,
            where: (table) =>
                and(
                    eq(table.idOrganization, body.idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idFile),
                ),
        })

        if (readOneFile.storageKey !== null) {
            const _deleteObjectResponse = await deleteObject({
                var: c.var,
                storageKey: readOneFile.storageKey,
            })
        }

        const deleteOneFile = await deleteOne({
            database: c.var.clients.sql,
            table: models.file,
            where: (table) =>
                and(
                    eq(table.idOrganization, body.idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idFile),
                ),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: deleteOneFileRouteDefinition.schemas.return,
            data: deleteOneFile,
        })
    })
