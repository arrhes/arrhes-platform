import { IconRosetteDiscountCheck, IconSettings } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { SubPageLayout } from "../../../../../components/layouts/subPageLayout.tsx"
import { organizationSettingsLayoutRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSettings/organizationSettingsLayoutRoute.tsx"

export function OrganizationSettingsLayout() {
    const params = useParams({ from: organizationSettingsLayoutRoute.id })

    return (
        <SubPageLayout
            sections={{
                settings: {
                    title: "Paramètres",
                    icon: <IconSettings />,
                    items: [
                        {
                            label: "Général",
                            to: "/dashboard/organisations/$idOrganization/paramètres",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                    ],
                },
                subscription: {
                    title: "Abonnement",
                    icon: <IconRosetteDiscountCheck />,
                    items: [
                        {
                            label: "Abonnement",
                            to: "/dashboard/organisations/$idOrganization/paramètres/abonnement",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                        {
                            label: "Historique",
                            to: "/dashboard/organisations/$idOrganization/paramètres/abonnement/historique",
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
