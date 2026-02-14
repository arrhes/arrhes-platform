import { routePath } from "../../../../../../../../components/_index.js"
import { recordLabelSchema, recordLabelSchemaReturn } from "../../../../../../../../schemas/recordLabel.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const readAllRecordLabelsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-record-labels`,
    schemas: {
        body: v.object({
            idOrganization: recordLabelSchema.entries.idOrganization,
            idYear: recordLabelSchema.entries.idYear,
        }),
        return: v.array(recordLabelSchemaReturn)
    },
})
