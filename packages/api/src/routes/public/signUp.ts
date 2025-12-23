import { publicFactory } from "#/factories/publicFactory.js"
import { serializeCookie } from "#/utilities/cookies/serializeCookie.js"
import { signString } from "#/utilities/cookies/signString.js"
import { Exception } from "#/utilities/exception.js"
import { generateVerificationToken } from "#/utilities/generateVerificationToken.js"
import { getRemoteAddress } from "#/utilities/getRemoteAddress.js"
import { response } from "#/utilities/response.js"
import { insertOne } from "#/utilities/sql/insertOne.js"
import { cookiePrefix, userSessionCookieMaxAge } from "#/utilities/variables.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/application-metadata/models"
import { signUpRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { pbkdf2Sync } from "crypto"


export const signUpRoute = publicFactory.createApp()
    .post(
        signUpRouteDefinition.path,
        bodyValidator(signUpRouteDefinition.schemas.body),
        async (c) => {
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