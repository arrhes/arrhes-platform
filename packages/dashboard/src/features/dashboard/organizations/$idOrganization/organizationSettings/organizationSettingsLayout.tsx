import { IconSettings, IconUsers } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { SubPageLayout } from "../../../../../components/layouts/subPageLayout.tsx"
import { organizationSettingsLayoutRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSettings/organizationSettingsLayoutRoute.tsx"


export function OrganizationSettingsLayout() {
    const params = useParams({ from: organizationSettingsLayoutRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <SubPageLayout
                    tabs={[
                        {
                            label: "Général",
                            icon: <IconSettings />,
                            to: "/organisations/$idOrganization/paramètres",
                            params: { idOrganization: params.idOrganization, }
                        },
                        {
                            label: "Membres",
                            icon: <IconUsers />,
                            to: "/organisations/$idOrganization/paramètres/membres",
                            params: { idOrganization: params.idOrganization, }
                        },
                    ]}
                />
            </Page.Content>
        </Page.Root>
    )
}