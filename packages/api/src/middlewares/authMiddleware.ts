import { AuthEnv } from "#src/factories/authFactory.js"
import { parseCookies } from "#src/utilities/cookies/parseCookies.js"
import { unsignString } from "#src/utilities/cookies/unsignString.js"
import { Exception } from "#src/utilities/exception.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { cookiePrefix } from "#src/utilities/variables.js"
import { models } from "@arrhes/schemas/models"
import { eq } from "drizzle-orm"
import { createMiddleware } from "hono/factory"


export const authMiddleware = createMiddleware<AuthEnv>(async (c, next) => {
    try {
        const cookies = parseCookies({ value: c.req.header("Cookie") })
        const idUserSession = unsignString({
            signedValue: cookies[`${cookiePrefix}_${"id_user_session"}`],
            secret: c.var.env.COOKIES_KEY,
        })

        if (idUserSession === undefined) {
            throw new Exception({
                internalMessage: "Auth error",
                cause: "id_user_session not found in signed cookie",
            })
        }

        const userSession = await selectOne({
            database: c.var.clients.sql,
            table: models.userSession,
            where: (table) => (
                eq(table.id, idUserSession)
            )
        })
        if (userSession.isActive === false) {
            throw new Exception({
                internalMessage: "Auth error",
                cause: "userSession.isActive is false"
            })
        }
        c.set("userSession", userSession)


        const user = await selectOne({
            database: c.var.clients.sql,
            table: models.user,
            where: (table) => (
                eq(table.id, userSession.idUser)
            )
        })
        c.set("user", user)

        await next()
    }
    catch (error: unknown) {

        // c.res.headers.append(
        //     "Set-Cookie",
        //     serializeCookie({
        //         name: `${cookiePrefix}_${"id_user_session"}`,
        //         value: "",
        //         options: {
        //             maxAge: userSessionCookieMaxAge,
        //             httpOnly: true,
        //             secure: true,
        //             sameSite: "None",
        //             domain: c.var.env.COOKIES_DOMAIN,
        //             path: "/",
        //         }
        //     })
        // )
        // c.res.headers.append(
        //     "Set-Cookie",
        //     serializeCookie({
        //         name: `${cookiePrefix}_${"is_auth"}`,
        //         value: String(false),
        //         options: {
        //             maxAge: userSessionCookieMaxAge,
        //             httpOnly: false,
        //             secure: true,
        //             sameSite: "None",
        //             domain: c.var.env.COOKIES_DOMAIN,
        //             path: "/",
        //         }
        //     })
        // )

        throw new Exception({
            statusCode: 401,
            internalMessage: "Auth error",
            rawError: error,
        })
    }
})
