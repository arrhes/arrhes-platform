import type { Env } from "hono"
import { createFactory } from "hono/factory"
import type { getClients } from "../utilities/getClients.js"
import type { getEnv } from "../utilities/getEnv.js"

export type ApiEnv = Env & {
    Variables: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
}

export const apiFactory = createFactory<ApiEnv>({})
