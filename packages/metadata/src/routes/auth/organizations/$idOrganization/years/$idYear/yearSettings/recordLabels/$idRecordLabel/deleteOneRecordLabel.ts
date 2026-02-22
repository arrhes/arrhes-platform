import { routePath } from "../../../../../../../../../components/_index.js"
import { recordLabelSchema } from "../../../../../../../../../schemas/recordLabel.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const deleteOneRecordLabelRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-record-label`,
    schemas: {
        body: v.object({
            idRecordLabel: recordLabelSchema.entries.id,
            idOrganization: recordLabelSchema.entries.idOrganization,
            idYear: recordLabelSchema.entries.idYear,
        }),
        return: v.object({})
    },
})
