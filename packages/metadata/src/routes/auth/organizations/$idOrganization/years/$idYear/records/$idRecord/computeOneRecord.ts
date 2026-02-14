import { routePath } from "../../../../../../../../components/_index.js"
import { recordSchema, recordSchemaReturn } from "../../../../../../../../schemas/record.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const computeOneRecordRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/compute-one-record`,
    schemas: {
        body: v.object({
            idRecord: recordSchema.entries.id,
            idOrganization: recordSchema.entries.idOrganization,
            idYear: recordSchema.entries.idYear,
        }),
        return: recordSchemaReturn
    },
})
