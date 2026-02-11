import { IconBook, IconChartBar } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../../../../components/layouts/page/page.js"
import { SubPageLayout } from "../../../../../../../components/layouts/subPageLayout.js"
import { reportsLayoutRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"


export function ReportsLayout() {
    const params = useParams({ from: reportsLayoutRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <SubPageLayout
                    sections={{
                        journals: {
                            title: "Journaux",
                            icon: <IconBook size={14} />,
                            items: [
                                {
                                    label: "Livre-journal",
                                    to: "/dashboard/organisations/$idOrganization/exercices/$idYear/documents/livre-journal",
                                    params: {
                                        idOrganization: params.idOrganization,
                                        idYear: params.idYear,
                                    }
                                },
                                {
                                    label: "Grand livre",
                                    to: "/dashboard/organisations/$idOrganization/exercices/$idYear/documents/grand-livre",
                                    params: {
                                        idOrganization: params.idOrganization,
                                        idYear: params.idYear,
                                    }
                                },
                            ]
                        },
                        summaries: {
                            title: "Synthèses",
                            icon: <IconChartBar size={14} />,
                            items: [
                                {
                                    label: "Balance",
                                    to: "/dashboard/organisations/$idOrganization/exercices/$idYear/documents/balance",
                                    params: {
                                        idOrganization: params.idOrganization,
                                        idYear: params.idYear,
                                    }
                                },
                                {
                                    label: "Bilan",
                                    to: "/dashboard/organisations/$idOrganization/exercices/$idYear/documents/bilan",
                                    params: {
                                        idOrganization: params.idOrganization,
                                        idYear: params.idYear,
                                    }
                                },
                                {
                                    label: "Compte de résultat",
                                    to: "/dashboard/organisations/$idOrganization/exercices/$idYear/documents/compte-de-résultat",
                                    params: {
                                        idOrganization: params.idOrganization,
                                        idYear: params.idYear,
                                    }
                                },
                            ]
                        },
                    }}
                />
            </Page.Content>
        </Page.Root>
    )
}
