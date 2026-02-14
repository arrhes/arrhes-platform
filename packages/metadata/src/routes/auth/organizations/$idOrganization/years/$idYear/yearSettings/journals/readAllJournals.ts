import { routePath } from "../../../../../../../../components/_index.js"
import { journalSchema, journalSchemaReturn } from "../../../../../../../../schemas/journal.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const readAllJournalsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-journals`,
    schemas: {
        body: v.object({
            idOrganization: journalSchema.entries.idOrganization,
            idYear: journalSchema.entries.idYear,
        }),
        return: v.array(journalSchemaReturn)
    },
})
