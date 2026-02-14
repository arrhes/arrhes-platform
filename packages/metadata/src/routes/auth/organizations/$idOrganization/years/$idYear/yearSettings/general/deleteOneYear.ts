import { routePath } from "../../../../../../../../components/_index.js"
import { yearSchema } from "../../../../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"
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