import { $idOrganizationUserRoutes } from "#src/routes/auth/organizations/$idOrganization/organizationSettings/organizationUser/$idOrganizationUser/$idOrganizationUserRoutes.js"
import { createOneOrganizationUserRoute } from "#src/routes/auth/organizations/$idOrganization/organizationSettings/organizationUser/createOneOrganizationUser.js"
import { readAllOrganizationUsersRoute } from "#src/routes/auth/organizations/$idOrganization/organizationSettings/organizationUser/readAllOrganizationUsers.js"


export const organizationUsersRoutes = [
    createOneOrganizationUserRoute,
    readAllOrganizationUsersRoute,

    ...$idOrganizationUserRoutes,
]
