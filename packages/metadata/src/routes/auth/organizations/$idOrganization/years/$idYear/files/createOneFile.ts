import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { fileSchema, fileSchemaReturn } from "../../../../../../../schemas/file.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const createOneFileRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-file`,
    schemas: {
        body: v.object({
            idOrganization: fileSchema.entries.idOrganization,
            idYear: fileSchema.entries.idYear,
            reference: fileSchema.entries.reference,
            name: v.optional(fileSchema.entries.name),
        }),
        return: fileSchemaReturn,
    },
})
