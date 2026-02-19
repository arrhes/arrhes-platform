import { generalRoutes } from "../../../../../routes/auth/organizations/$idOrganization/organizationSettings/general/generalRoutes.js"
import { organizationPaymentsRoutes } from "../../../../../routes/auth/organizations/$idOrganization/organizationSettings/organizationPayment/organizationPaymentsRoutes.js"
import { organizationUsersRoutes } from "../../../../../routes/auth/organizations/$idOrganization/organizationSettings/organizationUser/organizationUsersRoutes.js"

export const organizationSettingsRoutes = [...generalRoutes, ...organizationPaymentsRoutes, ...organizationUsersRoutes]
