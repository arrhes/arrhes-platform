import { routePath } from "#src/components/_index.js"
import { yearSchema, yearSchemaReturn } from "#src/schemas/year.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const createOneYearRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-year`,
    schemas: {
        body: v.object({
            idOrganization: yearSchema.entries.idOrganization,
            idYearPrevious: v.optional(yearSchema.entries.idYearPrevious),
            label: v.optional(yearSchema.entries.label),
            startingAt: yearSchema.entries.startingAt,
            endingAt: yearSchema.entries.endingAt,
        }),
        return: yearSchemaReturn
    },
})
