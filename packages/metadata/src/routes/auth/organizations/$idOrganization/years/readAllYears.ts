import { routePath } from "#src/components/_index.js"
import { yearSchema, yearSchemaReturn } from "#src/schemas/year.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const readAllYearsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-years`,
    schemas: {
        body: v.object({
            idOrganization: yearSchema.entries.idOrganization,
        }),
        return: v.array(yearSchemaReturn)
    },
})
