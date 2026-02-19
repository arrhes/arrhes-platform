import { IconCreditCard, IconSettings } from "@tabler/icons-react"
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
                    icon: <IconSettings size={14} />,
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
                    title: "Facturation",
                    icon: <IconCreditCard size={14} />,
                    items: [
                        {
                            label: "Abonnement",
                            to: "/dashboard/organisations/$idOrganization/paramètres/abonnement",
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
