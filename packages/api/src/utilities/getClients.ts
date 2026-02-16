import { emailClient } from "../clients/emailClient.js"
import { sqlClient } from "../clients/sqlClient.js"
import { storageClient } from "../clients/storageClient.js"
import type { getEnv } from "../utilities/getEnv.js"

export async function getClients(env: ReturnType<typeof getEnv>) {
    return {
        sql: sqlClient(env),
        storage: storageClient(env),
        email: emailClient(env),
    }
}
