import { IconHome, IconKey } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { SubPageLayout } from "../../../../../components/layouts/subPageLayout.tsx"
import { organizationApiKeysLayoutRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/organizationApiKeys/organizationApiKeysLayoutRoute.tsx"

export function OrganizationApiKeysLayout() {
    const params = useParams({ from: organizationApiKeysLayoutRoute.id })

    return (
        <SubPageLayout
            sections={{
                api: {
                    items: [
                        {
                            label: "Général",
                            icon: <IconHome />,
                            to: "/dashboard/organisations/$idOrganization/clés-api",
                            params: {
                                idOrganization: params.idOrganization,
                            },
                        },
                        {
                            label: "Clés",
                            icon: <IconKey />,
                            to: "/dashboard/organisations/$idOrganization/clés-api/clés",
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
