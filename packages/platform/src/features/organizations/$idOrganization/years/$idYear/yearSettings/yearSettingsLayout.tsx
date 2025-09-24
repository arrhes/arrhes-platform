import { IconFileDiff, IconFileReport, IconNews, IconSettings, IconSitemap } from "@tabler/icons-react";
import { useParams } from "@tanstack/react-router";
import { Page } from "components/layouts/page/page";
import { SubPageLayout } from "components/layouts/subPageLayout";
import { yearSettingsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute";


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
                            to: "/organisations/$idOrganization/exercices/$idYear/paramètres",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }
                        },
                        {
                            label: "Plan des comptes",
                            icon: <IconSitemap />,
                            to: "/organisations/$idOrganization/exercices/$idYear/paramètres/comptes",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }
                        },
                        {
                            label: "Journaux",
                            icon: <IconNews />,
                            to: "/organisations/$idOrganization/exercices/$idYear/paramètres/journaux",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }
                        },
                        {
                            label: "Bilan",
                            icon: <IconFileReport />,
                            to: "/organisations/$idOrganization/exercices/$idYear/paramètres/bilan",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }
                        },
                        {
                            label: "Compte de résultat",
                            icon: <IconFileDiff />,
                            to: "/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat",
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