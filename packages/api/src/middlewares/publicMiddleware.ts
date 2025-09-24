import { publicFactory } from "#src/factories/publicFactory.js"


export const publicMiddleware = publicFactory.createMiddleware(async (c, next) => {
    await next()
})