import { publicFactory } from "#/factories/publicFactory.js"
import { response } from "#/utilities/response.js"
import { selectOne } from "#/utilities/sql/selectOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { sendMagicLinkRouteDefinition } from "@arrhes/metadata/routes"
import { eq } from "drizzle-orm"


export const sendMagicLinkRoute = publicFactory.createApp()
    .post(
        sendMagicLinkRouteDefinition.path,
        bodyValidator(sendMagicLinkRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const user = await selectOne({
                database: c.var.clients.sql,
                table: models.user,
                where: (table) => (
                    eq(table.email, body.email.trim().toLowerCase())
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: sendMagicLinkRouteDefinition.schemas.return,
                data: {},
            })
        }
    )