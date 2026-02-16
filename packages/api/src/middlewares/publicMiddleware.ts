import { publicFactory } from "../factories/publicFactory.js"

export const publicMiddleware = publicFactory.createMiddleware(async (c, next) => {
    await next()
})
