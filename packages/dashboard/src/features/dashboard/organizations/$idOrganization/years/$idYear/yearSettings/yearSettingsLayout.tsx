import { IconFileDiff, IconFileReport, IconLabel, IconNews, IconSettings, IconSitemap } from "@tabler/icons-react";
import { useParams } from "@tanstack/react-router";
import { Page } from "../../../../../../../components/layouts/page/page.tsx";
import { SubPageLayout } from "../../../../../../../components/layouts/subPageLayout.tsx";
import { yearSettingsLayoutRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute.tsx";


export function YearSettingsLayout() {
    const params = useParams({ from: yearSettingsLayoutRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <SubPageLayout
                    tabs={[
                        {
                            label: "Général",
                            icon: <IconSettings />,
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }
                        },
                        {
                            label: "Plan des comptes",
                            icon: <IconSitemap />,
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/comptes",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }
                        },
                        {
                            label: "Journaux",
                            icon: <IconNews />,
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/journaux",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }
                        },
                        {
                            label: "Catégories",
                            icon: <IconLabel />,
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/catégories",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }
                        },
                        {
                            label: "Bilan",
                            icon: <IconFileReport />,
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/bilan",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }
                        },
                        {
                            label: "Compte de résultat",
                            icon: <IconFileDiff />,
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat",
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