import { routePath } from "#src/components/_index.js"
import { yearSchema, yearSchemaReturn } from "#src/schemas/year.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const updateOneYearRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-year`,
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
            idOrganization: yearSchema.entries.idOrganization,
            idYearPrevious: v.optional(yearSchema.entries.idYearPrevious),
            label: v.optional(yearSchema.entries.label),
            startingAt: v.optional(yearSchema.entries.startingAt),
            endingAt: v.optional(yearSchema.entries.endingAt),
        }),
        return: yearSchemaReturn
    },
})
