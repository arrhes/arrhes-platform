import { models } from "@arrhes/application-metadata/models"
import { readOneFileRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"

export const readOneFileRoute = authFactory
    .createApp()
    .post(readOneFileRouteDefinition.path, bodyValidator(readOneFileRouteDefinition.schemas.body), async (c) => {
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

        return response({
            context: c,
            statusCode: 200,
            schema: readOneFileRouteDefinition.schemas.return,
            data: readOneFile,
        })
    })
