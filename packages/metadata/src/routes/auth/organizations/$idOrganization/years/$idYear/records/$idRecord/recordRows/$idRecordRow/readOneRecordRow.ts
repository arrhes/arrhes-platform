import { routePath } from "../../../../../../../../../../components/_index.js"
import { recordRowSchema, recordRowSchemaReturn } from "../../../../../../../../../../schemas/recordRow.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const readOneRecordRowRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-record-row`,
    schemas: {
        body: v.object({
            idRecordRow: recordRowSchema.entries.id,
            idOrganization: recordRowSchema.entries.idOrganization,
            idYear: recordRowSchema.entries.idYear,
        }),
        return: recordRowSchemaReturn
    },
})
