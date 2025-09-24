import { routePath } from "#src/components/_index.js"
import { recordRowSchema } from "#src/schemas/recordRow.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const deleteOneRecordRowRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-record-row`,
    schemas: {
        body: v.object({
            idRecordRow: recordRowSchema.entries.id,
            idOrganization: recordRowSchema.entries.idOrganization,
            idYear: recordRowSchema.entries.idYear,
        }),
        return: v.object({})
    },
})
