import { useParams } from "@tanstack/react-router"
import { SubPageLayout } from "../../../../../components/layouts/subPageLayout.tsx"
import { organizationSettingsLayoutRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSettings/organizationSettingsLayoutRoute.tsx"

export function OrganizationSettingsLayout() {
    const params = useParams({ from: organizationSettingsLayoutRoute.id })

    return (
        <SubPageLayout
            sections={{
                settings: {
                    // title: "Paramètres",
                    // icon: <IconSettings />,
                    items: [
                        {
                            label: "Général",
                            to: "/dashboard/organisations/$idOrganization/paramètres",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                        {
                            label: "Sécurité",
                            to: "/dashboard/organisations/$idOrganization/paramètres/sécurité",
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
