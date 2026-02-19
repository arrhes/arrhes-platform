import { createRoute } from "@tanstack/react-router"
import { organizationSubscriptionLayoutRoute } from "./organizationSubscriptionLayoutRoute.js"
import { OrganizationSubscriptionHistoryPage } from "../../../../../../../features/dashboard/organizations/$idOrganization/organizationSettings/organizationSubscription/organizationSubscriptionHistoryPage.js"

export const organizationSubscriptionHistoryRoute = createRoute({
    getParentRoute: () => organizationSubscriptionLayoutRoute,
    path: "/historique",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <OrganizationSubscriptionHistoryPage />,
})
