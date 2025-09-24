import { publicFactory } from "#src/factories/publicFactory.js"
import { serializeCookie } from "#src/utilities/cookies/serializeCookie.js"
import { signString } from "#src/utilities/cookies/signString.js"
import { Exception } from "#src/utilities/exception.js"
import { generateVerificationToken } from "#src/utilities/generateVerificationToken.js"
import { getRemoteAddress } from "#src/utilities/getRemoteAddress.js"
import { response } from "#src/utilities/response.js"
import { insertOne } from "#src/utilities/sql/insertOne.js"
import { cookiePrefix, userSessionCookieMaxAge } from "#src/utilities/variables.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { signUpRouteDefinition } from "@arrhes/schemas/routes"
import { generateId } from "@arrhes/schemas/utilities"
import { pbkdf2Sync } from "crypto"


export const signUpRoute = publicFactory.createApp()
    .post(
        signUpRouteDefinition.path,
        bodyValidator(signUpRouteDefinition.schemas.body),
        async (c) => {
            console.log(1)
            const body = c.req.valid("json")

            if (body.password !== body.passwordCheck) {
                throw new Exception({
                    statusCode: 400,
                    internalMessage: "Different passwords",
                    externalMessage: "Les mots de passe renseignés sont différents"
                })
            }

            const createUserSession = await c.var.clients.sql.transaction(async (tx) => {

                const passwordSalt = generateId()
                const passwordHash = pbkdf2Sync(body.password, passwordSalt, 128000, 64, "sha512").toString("hex")

                const createUser = await insertOne({
                    database: tx,
                    table: models.user,
                    data: {
                        id: generateId(),
                        isActive: true,
                        alias: null,
                        email: body.email,
                        isEmailValidated: false,
                        emailToken: generateVerificationToken(),
                        emailTokenExpiresAt: new Date(new Date().getTime() + (60 * 60 * 1000)).toISOString(),
                        passwordHash: passwordHash,
                        passwordSalt: passwordSalt,
                        createdAt: new Date().toISOString(),
                        lastUpdatedAt: null,
                    }
                })

                // Store the session
                const createUserSession = await insertOne({
                    database: tx,
                    table: models.userSession,
                    data: {
                        id: generateId(),
                        idUser: createUser.id,
                        isActive: true,
                        expiresAt: new Date(Date.now() + userSessionCookieMaxAge).toISOString(),
                        ip: getRemoteAddress({ context: c }),
                        createdAt: new Date().toISOString(),
                        lastUpdatedAt: null,
                    }
                })

                return createUserSession
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


            // await sendEmail({
            //     to: userResponse.email,
            //     subject: "Valider votre email",
            //     html: emailValidationTemplate({
            //         url: `${urlApp}/services/email?id=${userResponse.id}&token=${userResponse.emailToken}`,
            //     })
            // })

            return response({
                context: c,
                statusCode: 200,
                schema: signUpRouteDefinition.schemas.return,
                data: {},
            })
        }
    )