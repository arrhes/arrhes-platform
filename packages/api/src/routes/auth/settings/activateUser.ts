import { models } from "@arrhes/application-metadata/models"
import { activateUserRouteDefinition } from "@arrhes/application-metadata/routes"
import { eq } from "drizzle-orm"
import { authFactory } from "../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../utilities/exception.js"
import { response } from "../../../utilities/response.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

export const activateUserRoute = authFactory.createApp().post(activateUserRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: activateUserRouteDefinition.schemas.body,
    })

    if (body.emailToken !== c.var.user.emailToken) {
        throw new Exception({
            internalMessage: "Wrong token",
            statusCode: 403,
            externalMessage: "Code incorrect",
        })
    }

    const updatedUser = await updateOne({
        database: c.var.clients.sql,
        table: models.user,
        data: {
            isActive: true,
            emailToValidate: null,
            emailToken: null,
            emailTokenExpiresAt: null,
            lastUpdatedAt: new Date().toISOString(),
        },
        where: (table) => eq(table.id, c.var.user.id),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: activateUserRouteDefinition.schemas.return,
        data: updatedUser,
    })
})
