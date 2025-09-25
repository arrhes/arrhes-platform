import { Page } from "#/components/layouts/page/page.js"
import { SubPageLayout } from "#/components/layouts/subPageLayout.js"
import { reportsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"
import { IconFileDiff, IconFileReport, IconListDetails, IconListNumbers, IconScale } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"


export function ReportsLayout() {
    const params = useParams({ from: reportsLayoutRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <SubPageLayout
                    tabs={[
                        {
                            label: "Livre-journal",
                            icon: <IconListNumbers />,
                            to: "/organisations/$idOrganization/exercices/$idYear/documents/livre-journal",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }
                        },
                        {
                            label: "Grand livre",
                            icon: <IconListDetails />,
                            to: "/organisations/$idOrganization/exercices/$idYear/documents/grand-livre",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }
                        },
                        {
                            label: "Balance",
                            icon: <IconScale />,
                            to: "/organisations/$idOrganization/exercices/$idYear/documents/balance",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }
                        },
                        {
                            label: "Bilan",
                            icon: <IconFileReport />,
                            to: "/organisations/$idOrganization/exercices/$idYear/documents/bilan",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }
                        },
                        {
                            label: "Compte de résultat",
                            icon: <IconFileDiff />,
                            to: "/organisations/$idOrganization/exercices/$idYear/documents/compte-de-résultat",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }
                        },
                    ]}
                />
            </Page.Content>
        </Page.Root>
    )
}