import { publicFactory } from "#src/factories/publicFactory.js"
import { serializeCookie } from "#src/utilities/cookies/serializeCookie.js"
import { signString } from "#src/utilities/cookies/signString.js"
import { Exception } from "#src/utilities/exception.js"
import { getRemoteAddress } from "#src/utilities/getRemoteAddress.js"
import { response } from "#src/utilities/response.js"
import { insertOne } from "#src/utilities/sql/insertOne.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { cookiePrefix, userSessionCookieMaxAge } from "#src/utilities/variables.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { signInRouteDefinition } from "@arrhes/schemas/routes"
import { generateId } from "@arrhes/schemas/utilities"
import { pbkdf2Sync } from "crypto"
import { eq } from "drizzle-orm"


export const signInRoute = publicFactory.createApp()
    .post(
        signInRouteDefinition.path,
        bodyValidator(signInRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const user = await selectOne({
                database: c.var.clients.sql,
                table: models.user,
                where: (table) => (
                    eq(table.email, body.email.trim().toLowerCase())
                )
            })

            const passwordHash = pbkdf2Sync(body.password, user.passwordSalt, 128000, 64, "sha512").toString("hex")
            if (passwordHash !== user.passwordHash) {
                throw new Exception({
                    statusCode: 400,
                    internalMessage: "Error signing in",
                    cause: "Password does not match the database one"
                })
            }


            // Store the session
            const createUserSession = await insertOne({
                database: c.var.clients.sql,
                table: models.userSession,
                data: {
                    id: generateId(),
                    idUser: user.id,
                    isActive: true,
                    expiresAt: new Date(Date.now() + userSessionCookieMaxAge).toISOString(),
                    ip: getRemoteAddress({ context: c }),
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                }
            })

            // Set cookies
            c.res.headers.append(
                "Set-Cookie",
                serializeCookie({
                    name: `${cookiePrefix}_${"id_user_session"}`,
                    value: signString({
                        value: createUserSession.id,
                        secret: c.var.env.COOKIES_KEY,
                    }),
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
                    value: String(true),
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
                schema: signInRouteDefinition.schemas.return,
                data: {},
            })
        }
    )