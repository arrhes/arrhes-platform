import { publicFactory } from "#/factories/publicFactory.js"
import { parseCookies } from "#/utilities/cookies/parseCookies.js"
import { serializeCookie } from "#/utilities/cookies/serializeCookie.js"
import { unsignString } from "#/utilities/cookies/unsignString.js"
import { Exception } from "#/utilities/exception.js"
import { response } from "#/utilities/response.js"
import { updateOne } from "#/utilities/sql/updateOne.js"
import { cookiePrefix, userSessionCookieMaxAge } from "#/utilities/variables.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { signOutRouteDefinition } from "@arrhes/metadata/routes"
import { eq } from "drizzle-orm"


export const signOutRoute = publicFactory.createApp()
    .post(
        signOutRouteDefinition.path,
        bodyValidator(signOutRouteDefinition.schemas.body),
        async (c) => {
            // const body = c.req.valid("json")

            try {
                const idUserSession = unsignString({
                    signedValue: parseCookies({ value: c.req.header("cookie") })[`${cookiePrefix}_${"id_user_session"}`],
                    secret: c.var.env.COOKIES_KEY,
                })

                if (idUserSession === undefined) {
                    throw new Exception({
                        statusCode: 401,
                        internalMessage: "Invalid session",
                        cause: "idUserSession not found in signed cookie"
                    })
                }

                await updateOne({
                    database: c.var.clients.sql,
                    table: models.userSession,
                    data: {
                        lastUpdatedAt: new Date().toISOString(),
                        isActive: false,
                    },
                    where: (table) => (
                        eq(table.id, idUserSession)
                    )
                })
            }
            catch (erro: unknown) {
                // do nothing
            }


            c.res.headers.append(
                "Set-Cookie",
                serializeCookie({
                    name: `${cookiePrefix}_${"id_user_session"}`,
                    value: "",
                    options: {
                        maxAge: userSessionCookieMaxAge,
                        httpOnly: true,
                        secure: true,
                        sameSite: "None",
                        domain: c.var.env.COOKIES_DOMAIN,
                        path: "/",
                    }
                })
            )
            c.res.headers.append(
                "Set-Cookie",
                serializeCookie({
                    name: `${cookiePrefix}_${"is_auth"}`,
                    value: String(false),
                    options: {
                        maxAge: userSessionCookieMaxAge,
                        httpOnly: false,
                        secure: true,
                        sameSite: "None",
                        domain: c.var.env.COOKIES_DOMAIN,
                        path: "/",
                    }
                })
            )

            return response({
                context: c,
                statusCode: 200,
                schema: signOutRouteDefinition.schemas.return,
                data: {},
            })
        }
    )