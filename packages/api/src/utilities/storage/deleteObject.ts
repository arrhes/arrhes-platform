import { Exception } from "#/utilities/exception.js"
import { getClients } from "#/utilities/getClients.js"
import { getEnv } from "#/utilities/getEnv.js"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"


export async function deleteObject(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    },
    storageKey: string
}) {
    try {

        const command = new DeleteObjectCommand({
            Bucket: parameters.var.env.STORAGE_BUCKET_NAME,
            Key: parameters.storageKey
        })

        const response = await parameters.var.clients.storage.send(
            command,
            {
                abortSignal: undefined,
                requestTimeout: undefined
            }
        )

        return response
    }
    catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Object not deleted from storage",
            rawError: error
        })
    }
}