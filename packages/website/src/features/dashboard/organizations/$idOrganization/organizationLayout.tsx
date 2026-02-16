import { IconCalendarEvent, IconSettings, IconUsers } from "@tabler/icons-react"
import { Outlet, useParams } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import { PageNavigation } from "../../../../components/layouts/page/pageNavigation.tsx"
import { organizationLayoutRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationLayoutRoute.tsx"

export function OrganizationLayout() {
    const params = useParams({ from: organizationLayoutRoute.id })

    return (
        <Fragment>
            <PageNavigation
                tabs={[
                    {
                        label: "Exercices",
                        icon: <IconCalendarEvent />,
                        to: "/dashboard/organisations/$idOrganization/exercices",
                        params: {
                            idOrganization: params.idOrganization,
                        },
                    },
                    {
                        label: "Membres",
                        icon: <IconUsers />,
                        to: "/dashboard/organisations/$idOrganization/membres",
                        params: {
                            idOrganization: params.idOrganization,
                        },
                    },
                    {
                        label: "Paramètres",
                        icon: <IconSettings />,
                        to: "/dashboard/organisations/$idOrganization/paramètres",
                        params: {
                            idOrganization: params.idOrganization,
                        },
                    },
                ]}
            />
            <Outlet />
        </Fragment>
    )
}
