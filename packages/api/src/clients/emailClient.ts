import { Exception } from "#src/utilities/exception.js"
import { getEnv } from "#src/utilities/getEnv.js"
import { createTransport } from "nodemailer"


export function emailClient(env: ReturnType<typeof getEnv>) {
    try {
        const smtpClient = createTransport({
            host: env.EMAIL_ENDPOINT,
            port: 465,
            secure: true,
            auth: {
                user: env.EMAIL_USER,
                pass: env.EMAIL_PASSWORD
            }
        },
            {
                from: "Arrhes <nepasrepondre@arrhes.com>"
            }
        )

        return smtpClient
    }
    catch (error) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "SQL client not available",
            rawError: error,
        })
    }
}