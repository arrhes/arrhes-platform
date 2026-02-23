import { useParams } from "@tanstack/react-router"
import { SubPageLayout } from "../../../../../components/layouts/subPageLayout.tsx"
import { organizationSubscriptionLayoutRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSubscription/organizationSubscriptionLayoutRoute.tsx"

export function OrganizationSubscriptionLayout() {
    const params = useParams({ from: organizationSubscriptionLayoutRoute.id })

    return (
        <SubPageLayout
            sections={{
                subscription: {
                    // title: "Abonnement",
                    // icon: <IconRosetteDiscountCheck />,
                    items: [
                        {
                            label: "Abonnement",
                            to: "/dashboard/organisations/$idOrganization/abonnement",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                        {
                            label: "Historique",
                            to: "/dashboard/organisations/$idOrganization/abonnement/historique",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                    ],
                },
            }}
        />
    )
}
