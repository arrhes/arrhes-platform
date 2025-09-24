import { deleteOneOrganizationUserRoute } from "#src/routes/auth/organizations/$idOrganization/organizationSettings/organizationUser/$idOrganizationUser/deleteOneOrganizationUser.js"
import { readOneOrganizationUserRoute } from "#src/routes/auth/organizations/$idOrganization/organizationSettings/organizationUser/$idOrganizationUser/readOneOrganizationUser.js"
import { updateOneOrganizationUserRoute } from "#src/routes/auth/organizations/$idOrganization/organizationSettings/organizationUser/$idOrganizationUser/updateOneOrganizationUser.js"


export const $idOrganizationUserRoutes = [
    deleteOneOrganizationUserRoute,
    readOneOrganizationUserRoute,
    updateOneOrganizationUserRoute,
]