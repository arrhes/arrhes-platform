import { eq } from "drizzle-orm"
import { Context } from "hono"
import { parseCookies } from "../utilities/cookies/parseCookies.js"
import { unsignString } from "../utilities/cookies/unsignString.js"
import { Exception } from "../utilities/exception.js"
import { cookiePrefix } from "../utilities/variables.js"
import { models } from "@arrhes/application-metadata"

export async function checkUserSessionMiddleware(parameters: { context: Context<any> }) {
    try {
        // Get session ID from signed cookie
        const cookieMap = parseCookies({ value: parameters.context.req.header("Cookie") })

        const idUserSession = unsignString({
            signedValue: cookieMap[`${cookiePrefix}_id_user_session`],
            secret: parameters.context.var.env.COOKIES_KEY,
        })

        if (!idUserSession) {
            throw new Exception({
                internalMessage: "Auth error",
                cause: "id_user_session not found in cookie",
            })
        }

        const userSession = await parameters.context.var.clients.sql.query.userSessionModel.findFirst({
            where: eq(models.userSession.id, idUserSession),
        })

        if (!userSession || userSession.isActive === false) {
            throw new Exception({
                internalMessage: "Auth error",
                cause: "User session not found or inactive",
            })
        }

        const user = await parameters.context.var.clients.sql.query.userModel.findFirst({
            where: eq(models.user.id, userSession.idUser),
        })

        if (!user) {
            throw new Exception({
                internalMessage: "Auth error",
                cause: "User not found",
            })
        }
        parameters.context.set("user", user)

        return {
            userSession: userSession,
            user: user,
        }
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 401,
            internalMessage: "Auth error",
            rawError: error,
        })
    }
}
