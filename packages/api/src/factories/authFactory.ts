import { ApiEnv } from "#src/factories/apiFactory.js"
import { models } from "@arrhes/schemas/models"
import { createFactory } from "hono/factory"


export type AuthEnv = ApiEnv & {
    Variables: {
        userSession: typeof models.userSession.$inferSelect
        user: typeof models.user.$inferSelect
    }
}

export const authFactory = createFactory<AuthEnv>()
