import { ApiEnv } from "#src/factories/apiFactory.js"
import { createFactory } from "hono/factory"


export type PublicEnv = ApiEnv & {
    Variables: {}
}

export const publicFactory = createFactory<PublicEnv>()
