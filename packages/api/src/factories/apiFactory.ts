import { getClients } from "#src/utilities/getClients.js"
import { getEnv } from "#src/utilities/getEnv.js"
import { Env } from "hono"
import { createFactory } from "hono/factory"


export type ApiEnv = Env & {
    Variables: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
}

export const apiFactory = createFactory<ApiEnv>({})
