import { generalRoutes } from "#src/routes/auth/organizations/$idOrganization/organizationSettings/general/generalRoutes.js"
import { organizationUsersRoutes } from "#src/routes/auth/organizations/$idOrganization/organizationSettings/organizationUser/organizationUsersRoutes.js"


export const organizationSettingsRoutes = [
    ...generalRoutes,
    ...organizationUsersRoutes,
]
