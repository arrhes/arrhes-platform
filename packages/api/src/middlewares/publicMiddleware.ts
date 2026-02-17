import { publicFactory } from "../factories/publicFactory.js"

export const publicMiddleware = publicFactory.createMiddleware(async (_c, next) => {
    await next()
})
