import { $idOrganizationUserRoutes } from "../../../../../../routes/auth/organizations/$idOrganization/organizationSettings/organizationUser/$idOrganizationUser/$idOrganizationUserRoutes.js"
import { createOneOrganizationUserRoute } from "../../../../../../routes/auth/organizations/$idOrganization/organizationSettings/organizationUser/createOneOrganizationUser.js"
import { readAllOrganizationUsersRoute } from "../../../../../../routes/auth/organizations/$idOrganization/organizationSettings/organizationUser/readAllOrganizationUsers.js"


export const organizationUsersRoutes = [
    createOneOrganizationUserRoute,
    readAllOrganizationUsersRoute,

    ...$idOrganizationUserRoutes,
]
