import { models } from "@arrhes/application-metadata/models"
import { readAllAccountsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"

export const readAllAccountsRoute = authFactory
    .createApp()
    .post(
        readAllAccountsRouteDefinition.path,
        bodyValidator(readAllAccountsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllAccounts = await selectMany({
                database: c.var.clients.sql,
                table: models.account,
                where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear)),
            })

            return response({
                context: c,
                statusCode: 200,
                schema: readAllAccountsRouteDefinition.schemas.return,
                data: readAllAccounts,
            })
        },
    )
