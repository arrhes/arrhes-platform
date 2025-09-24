import { Exception } from "#/utilities/exception.js"
import * as v from "valibot"


export function validate<
    T extends v.GenericSchema<unknown, unknown>
>(parameters: {
    schema: T
    data: v.InferOutput<T>
}) {

    const parsed = v.safeParse(
        parameters.schema,
        parameters.data,
        {
            abortEarly: true,
            abortPipeEarly: true,
        },
    )

    if (parsed.success === false) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Invalid data",
            cause: JSON.stringify(v.flatten(parsed.issues)),
        })
    }

    return parsed.output
}