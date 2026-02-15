import * as v from "valibot"
import { routePath } from "../../../../../../components/index.js"
import { yearSchema, yearSchemaReturn } from "../../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"


export const readOneYearRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-year`,
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
            idOrganization: yearSchema.entries.idOrganization,
        }),
        return: yearSchemaReturn
    },
})
