import { createFactory } from "hono/factory"
import type { ApiEnv } from "../factories/apiFactory.js"

export type PublicEnv = ApiEnv & {
    Variables: {}
}

export const publicFactory = createFactory<PublicEnv>()
