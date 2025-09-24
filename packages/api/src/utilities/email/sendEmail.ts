import { Exception } from "#src/utilities/exception.js"
import { getClients } from "#src/utilities/getClients.js"
import { getEnv } from "#src/utilities/getEnv.js"


export async function sendEmail(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    },
    subject: string
    from?: string
    to: string | string[]
    html: string
    // attachments?: {
    //     content: Buffer | string | undefined
    //     filename: string
    // }[]
}) {
    try {
        const response = await parameters.var.clients.email.sendMail(parameters)

        if (!response.accepted) {
            throw new Exception({
                internalMessage: "Email not sent",
                cause: response.rejected.toString()
            })
        }
    }
    catch (error: unknown) {
        throw new Exception({
            internalMessage: "Email not sent",
            rawError: error
        })
    }
}
