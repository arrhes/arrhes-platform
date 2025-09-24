import { authFactory } from "#/factories/authFactory.js"


export const userVerificationMiddleware = authFactory.createMiddleware(async (c, next) => {

    // if (c.var.userSession.isUserVerified === false) {
    //     throw new Exception({
    //         statusCode: 403,
    //         errorCode: "USER_NOT_VERIFIED",
    //         message: "You must be verified",
    //         cause: "User is not verified"
    //     })
    // }

    await next()
})
