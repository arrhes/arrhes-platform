import { routePath } from "../../../../../../../../components/_index.js"
import { journalSchema, journalSchemaReturn } from "../../../../../../../../schemas/journal.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
import * as v from "valibot"


export const createOneJournalRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-journal`,
    schemas: {
        body: v.object({
            idOrganization: journalSchema.entries.idOrganization,
            idYear: journalSchema.entries.idYear,
            code: journalSchema.entries.code,
            label: journalSchema.entries.label
        }),
        return: journalSchemaReturn
    },
})
