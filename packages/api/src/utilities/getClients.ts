import { emailClient } from "#src/clients/emailClient.js"
import { sqlClient } from "#src/clients/sqlClient.js"
import { storageClient } from "#src/clients/storageClient.js"
import { getEnv } from "#src/utilities/getEnv.js"


export async function getClients(env: ReturnType<typeof getEnv>) {
    return ({
        sql: sqlClient(env),
        storage: storageClient(env),
        email: emailClient(env)
    })
}