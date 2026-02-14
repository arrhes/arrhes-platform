import { routePath } from "../../../../../../../../../components/_index.js"
import { recordLabelSchema, recordLabelSchemaReturn } from "../../../../../../../../../schemas/recordLabel.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const readOneRecordLabelRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-record-label`,
    schemas: {
        body: v.object({
            idRecordLabel: recordLabelSchema.entries.id,
            idOrganization: recordLabelSchema.entries.idOrganization,
            idYear: recordLabelSchema.entries.idYear,
        }),
        return: recordLabelSchemaReturn
    },
})
