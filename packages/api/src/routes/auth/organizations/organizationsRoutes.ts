import { $idOrganizationRoutes } from "#src/routes/auth/organizations/$idOrganization/$idOrganizationRoutes.js"
import { activateOrganizationMembershipRoute } from "#src/routes/auth/organizations/activateOrganizationMembership.js"
import { addNewOrganizationRoute } from "#src/routes/auth/organizations/addNewOrganization.js"
import { getAllMyOrganizationsRoute } from "#src/routes/auth/organizations/getAllMyOrganizations.js"


export const organizationsRoutes = [
    activateOrganizationMembershipRoute,
    addNewOrganizationRoute,
    getAllMyOrganizationsRoute,

    ...$idOrganizationRoutes,
]