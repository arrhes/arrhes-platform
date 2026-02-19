import { createRoute } from "@tanstack/react-router"
import { OrganizationSubscriptionPage } from "../../../../../../../features/dashboard/organizations/$idOrganization/organizationSettings/organizationSubscription/organizationSubscriptionPage.js"
import { organizationSubscriptionLayoutRoute } from "./organizationSubscriptionLayoutRoute.js"

export const organizationSubscriptionRoute = createRoute({
    getParentRoute: () => organizationSubscriptionLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <OrganizationSubscriptionPage />,
})
