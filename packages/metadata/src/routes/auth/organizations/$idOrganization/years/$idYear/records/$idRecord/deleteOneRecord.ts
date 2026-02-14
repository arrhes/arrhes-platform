import { routePath } from "../../../../../../../../components/_index.js"
import { recordSchema } from "../../../../../../../../schemas/record.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const deleteOneRecordRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-record`,
    schemas: {
        body: v.object({
            idRecord: recordSchema.entries.id,
            idOrganization: recordSchema.entries.idOrganization,
            idYear: recordSchema.entries.idYear,
        }),
        return: v.object({})
    },
})
