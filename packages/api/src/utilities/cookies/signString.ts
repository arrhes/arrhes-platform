import { Exception } from "#src/utilities/exception.js"
import { createHmac } from "crypto"


export function signString(parameters: {
    value: string
    secret: string
}) {
    try {
        const hmac = createHmac("sha256", parameters.secret)
        hmac.update(parameters.value)

        return `${parameters.value}.${hmac.digest("base64url")}`
    }
    catch (error: unknown) {
        throw new Exception({
            internalMessage: "Error while signing string",
            rawError: error,
        })
    }
}
