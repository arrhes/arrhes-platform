import { pbkdf2Sync } from "node:crypto"
import { models } from "@arrhes/application-metadata/models"
import { updateUserEmailRouteDefinition } from "@arrhes/application-metadata/routes"
import { eq } from "drizzle-orm"
import { authFactory } from "../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../utilities/exception.js"
import { generateVerificationToken } from "../../../utilities/generateVerificationToken.js"
import { response } from "../../../utilities/response.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

export const updateUserEmailRoute = authFactory.createApp().post(updateUserEmailRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateUserEmailRouteDefinition.schemas.body,
    })

    const givenPasswordHash = pbkdf2Sync(body.currentPassword, c.var.user.passwordSalt, 128000, 64, `sha512`).toString(
        `hex`,
    )
    if (givenPasswordHash !== c.var.user.passwordHash) {
        throw new Exception({
            statusCode: 400,
            internalMessage: "Invalid password",
            externalMessage: "Mot de passe incorrect",
        })
    }

    const updatedEmail = await updateOne({
        database: c.var.clients.sql,
        table: models.user,
        data: {
            emailToValidate: body.emailToValidate,
            emailToken: generateVerificationToken(),
            emailTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
            lastUpdatedAt: new Date().toISOString(),
        },
        where: (table) => eq(table.id, c.var.user.id),
    })

    // await sendEmail({
    //     to: updateUser.email,
    //     subject: "Valider votre email",
    //     html: emailValidationTemplate({
    //         url: `${urlApp}/services/email?id=${updateUser.id}&token=${updateUser.emailToken}`,
    //     })
    // })

    return response({
        context: c,
        statusCode: 200,
        schema: updateUserEmailRouteDefinition.schemas.return,
        data: updatedEmail,
    })
})
