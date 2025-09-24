import { deleteOneOrganizationRoute } from "#/routes/auth/organizations/$idOrganization/organizationSettings/general/deleteOneOrganization.js"
import { updateOneOrganizationRoute } from "#/routes/auth/organizations/$idOrganization/organizationSettings/general/updateOneOrganization.js"


export const generalRoutes = [
    deleteOneOrganizationRoute,
    updateOneOrganizationRoute,
]