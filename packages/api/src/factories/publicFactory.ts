import { createFactory } from "hono/factory"
import type { ApiEnv } from "../factories/apiFactory.js"

export type PublicEnv = ApiEnv & {
    // biome-ignore lint/complexity/noBannedTypes: intentionally empty Variables for Hono factory
    Variables: {}
}

export const publicFactory = createFactory<PublicEnv>()
