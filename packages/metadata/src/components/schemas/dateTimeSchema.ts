import * as v from "valibot"

export const dateTimeSchema = v.pipe(
    v.string(),
    v.minLength(1),
    // v.isoTimestamp()
)
