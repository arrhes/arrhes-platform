import { Exception } from "../../utilities/exception.js"
import { getClients } from "../../utilities/getClients.js"
import { getEnv } from "../../utilities/getEnv.js"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"


export async function generatePutSignedUrl(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
    storageKey: string
    contentLength: number
    contentType: string
    metadata?: Record<string, string>
    expiresIn?: number
}) {
    try {
        const signedUrl = await getSignedUrl(
            parameters.var.clients.storage,
            new PutObjectCommand({
                ACL: "private",
                Bucket: parameters.var.env.STORAGE_BUCKET_NAME,
                Key: parameters.storageKey,
                ContentLength: parameters.contentLength,
                ContentType: parameters.contentType,
                Metadata: parameters.metadata,
            }),
            {
                expiresIn: parameters.expiresIn ?? 60,
            }
        )
        return signedUrl
    }
    catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Signed URL not generated",
            rawError: error
        })
    }
}
