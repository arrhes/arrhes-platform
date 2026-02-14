import { routePath } from "../../../../../../../../components/_index.js"
import { journalSchema, journalSchemaReturn } from "../../../../../../../../schemas/journal.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const generateJournalsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-journals`,
    schemas: {
        body: v.object({
            idOrganization: journalSchema.entries.idOrganization,
            idYear: journalSchema.entries.idYear,
        }),
        return: v.array(journalSchemaReturn)
    },
})
