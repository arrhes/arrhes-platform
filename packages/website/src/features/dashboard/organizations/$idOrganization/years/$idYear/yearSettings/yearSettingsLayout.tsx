import { IconFileReport, IconSettings } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { SubPageLayout } from "../../../../../../../components/layouts/subPageLayout.tsx"
import { yearSettingsLayoutRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute.tsx"

export function YearSettingsLayout() {
    const params = useParams({ from: yearSettingsLayoutRoute.id })

    return (
        <SubPageLayout
            sections={{
                settings: {
                    title: "Paramètres",
                    icon: <IconSettings size={14} />,
                    items: [
                        {
                            label: "Général",
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            },
                        },
                        {
                            label: "Plan des comptes",
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/comptes",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            },
                        },
                        {
                            label: "Journaux",
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/journaux",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            },
                        },
                        {
                            label: "Catégories",
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/catégories",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            },
                        },
                    ],
                },
                documents: {
                    title: "Documents comptables",
                    icon: <IconFileReport size={14} />,
                    items: [
                        {
                            label: "Bilan",
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/bilan",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            },
                        },
                        {
                            label: "Compte de résultat",
                            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat",
                            params: {
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            },
                        },
                    ],
                },
            }}
        />
    )
}
