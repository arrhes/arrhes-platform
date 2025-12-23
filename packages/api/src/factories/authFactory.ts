import { ApiEnv } from "#/factories/apiFactory.js"
import { models } from "@arrhes/application-metadata/models"
import { createFactory } from "hono/factory"


export type AuthEnv = ApiEnv & {
    Variables: {
        userSession: typeof models.userSession.$inferSelect
        user: typeof models.user.$inferSelect
    }
}

export const authFactory = createFactory<AuthEnv>()
