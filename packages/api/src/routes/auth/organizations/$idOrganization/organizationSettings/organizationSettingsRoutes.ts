import { generalRoutes } from "../../../../../routes/auth/organizations/$idOrganization/organizationSettings/general/generalRoutes.js"
import { organizationUsersRoutes } from "../../../../../routes/auth/organizations/$idOrganization/organizationSettings/organizationUser/organizationUsersRoutes.js"

export const organizationSettingsRoutes = [...generalRoutes, ...organizationUsersRoutes]
