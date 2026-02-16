import type { models } from "@arrhes/application-metadata/models"
import { createFactory } from "hono/factory"
import type { ApiEnv } from "../factories/apiFactory.js"

export type AuthEnv = ApiEnv & {
    Variables: {
        userSession: typeof models.userSession.$inferSelect
        user: typeof models.user.$inferSelect
    }
}

export const authFactory = createFactory<AuthEnv>()
