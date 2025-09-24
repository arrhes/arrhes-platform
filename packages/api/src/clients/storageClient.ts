import { Exception } from "#/utilities/exception.js"
import { getEnv } from "#/utilities/getEnv.js"
import { S3 } from "@aws-sdk/client-s3"


export function storageClient(env: ReturnType<typeof getEnv>) {
    try {
        const storageClient = new S3({
            endpoint: env.STORAGE_ENDPOINT,
            credentials: {
                accessKeyId: env.STORAGE_ACCESS_KEY,
                secretAccessKey: env.STORAGE_SECRET_KEY,
            },
            region: "fr-par"
        })
        return storageClient
    }
    catch (error) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Storage client not available",
            rawError: error,
        })
    }
}