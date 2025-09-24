import { IconSettings, IconUsers } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "components/layouts/page/page"
import { SubPageLayout } from "components/layouts/subPageLayout"
import { organizationSettingsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/organizationSettings/organizationSettingsLayoutRoute"


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