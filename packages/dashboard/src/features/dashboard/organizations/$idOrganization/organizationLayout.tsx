import { IconCalendarEvent, IconSettings } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { PageLayout } from "../../../../components/layouts/pageLayout.tsx"
import { organizationLayoutRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationLayoutRoute.tsx"


export function OrganizationLayout() {
    const params = useParams({ from: organizationLayoutRoute.id })

    return (
        <PageLayout
            tabs={[
                {
                    label: "Exercices fiscaux",
                    icon: <IconCalendarEvent />,
                    to: "/organisations/$idOrganization/exercices",
                    params: {
                        idOrganization: params.idOrganization,
                    },
                },
                {
                    label: "Paramètres",
                    icon: <IconSettings />,
                    to: "/organisations/$idOrganization/paramètres",
                    params: {
                        idOrganization: params.idOrganization,
                    },
                }
            ]}
        />
    )
}
