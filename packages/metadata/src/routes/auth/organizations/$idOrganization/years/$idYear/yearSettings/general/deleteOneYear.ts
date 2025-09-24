import { routePath } from "#src/components/_index.js"
import { yearSchema } from "#src/schemas/year.js"
import { routeDefinition } from "#src/utilities/routeDefinition.js"
import * as v from "valibot"


export const deleteOneYearRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-year`,
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
            idOrganization: yearSchema.entries.idOrganization,
        }),
        return: v.object({})
    },
})