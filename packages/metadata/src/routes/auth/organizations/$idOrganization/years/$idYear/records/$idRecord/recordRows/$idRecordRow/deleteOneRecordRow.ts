import { routePath } from "../../../../../../../../../../components/_index.js"
import { recordRowSchema } from "../../../../../../../../../../schemas/recordRow.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"
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
