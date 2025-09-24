import { authFactory } from "#src/factories/authFactory.js"
import { sendEmail } from "#src/utilities/email/sendEmail.js"
import { supportTemplate } from "#src/utilities/email/templates/support.js"
import { response } from "#src/utilities/response.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { sendSupportMessageRouteDefinition } from "@arrhes/schemas/routes"


export const sendSupportMessageRoute = authFactory.createApp()
    .post(
        sendSupportMessageRouteDefinition.path,
        bodyValidator(sendSupportMessageRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            await sendEmail({
                var: c.var,
                to: "support@arrhes.fr",
                subject: `[Support] ${c.var.user.id}`,
                html: supportTemplate({
                    category: body.category ?? "null",
                    date: new Date().toISOString(),
                    message: body.message
                })
            })

            return response({
                context: c,
                statusCode: 200,
                schema: sendSupportMessageRouteDefinition.schemas.return,
                data: {},
            })
        }
    )