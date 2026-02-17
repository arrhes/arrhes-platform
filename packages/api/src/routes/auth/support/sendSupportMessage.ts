import { sendSupportMessageRouteDefinition } from "@arrhes/application-metadata/routes"
import { authFactory } from "../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { sendEmail } from "../../../utilities/email/sendEmail.js"
import { supportTemplate } from "../../../utilities/email/templates/support.js"
import { response } from "../../../utilities/response.js"

export const sendSupportMessageRoute = authFactory
    .createApp()
    .post(sendSupportMessageRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: sendSupportMessageRouteDefinition.schemas.body,
        })

        await sendEmail({
            var: c.var,
            to: "support@arrhes.fr",
            subject: `[Support] ${c.var.user.id}`,
            html: supportTemplate({
                category: body.category ?? "null",
                date: new Date().toISOString(),
                message: body.message,
            }),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: sendSupportMessageRouteDefinition.schemas.return,
            data: {},
        })
    })
