import { validator } from "hono/validator"
import type * as v from "valibot"
import { Exception } from "../utilities/exception.js"
import { validate } from "../utilities/validate.js"

export const bodyValidator = <T extends v.ObjectSchema<v.ObjectEntries, undefined>>(schema: T) => {
    return validator("json", async (value, _c) => {
        try {
            const validatedBody = validate({
                schema: schema,
                data: value,
            })
            return validatedBody
        } catch (error: unknown) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "The body object can not be parsed",
                externalMessage: "Invalid request",
                rawError: error,
            })
        }
    })
}
