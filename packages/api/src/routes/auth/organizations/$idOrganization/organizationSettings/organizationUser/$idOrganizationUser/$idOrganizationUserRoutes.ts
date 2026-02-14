import { deleteOneOrganizationUserRoute } from "../../../../../../../routes/auth/organizations/$idOrganization/organizationSettings/organizationUser/$idOrganizationUser/deleteOneOrganizationUser.js"
import { readOneOrganizationUserRoute } from "../../../../../../../routes/auth/organizations/$idOrganization/organizationSettings/organizationUser/$idOrganizationUser/readOneOrganizationUser.js"
import { updateOneOrganizationUserRoute } from "../../../../../../../routes/auth/organizations/$idOrganization/organizationSettings/organizationUser/$idOrganizationUser/updateOneOrganizationUser.js"


export const $idOrganizationUserRoutes = [
    deleteOneOrganizationUserRoute,
    readOneOrganizationUserRoute,
    updateOneOrganizationUserRoute,
]