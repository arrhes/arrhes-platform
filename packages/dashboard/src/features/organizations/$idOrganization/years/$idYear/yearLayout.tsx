import { PageLayout } from "#/components/layouts/pageLayout.js"
import { yearLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearLayoutRoute.js"
import { IconFolders, IconPencil, IconReport, IconSettings } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"


export function YearLayout() {
    const params = useParams({ from: yearLayoutRoute.id })

    return (
        <PageLayout
            tabs={[
                {
                    label: "Écritures",
                    icon: <IconPencil />,
                    to: "/organisations/$idOrganization/exercices/$idYear/écritures",
                    params: {
                        idOrganization: params.idOrganization,
                        idYear: params.idYear,
                    },
                },
                {
                    label: "Stockage de fichiers",
                    icon: <IconFolders />,
                    to: "/organisations/$idOrganization/exercices/$idYear/fichiers",
                    params: {
                        idOrganization: params.idOrganization,
                        idYear: params.idYear,
                    },
                },
                {
                    label: "Documents comptables",
                    icon: <IconReport />,
                    to: "/organisations/$idOrganization/exercices/$idYear/documents",
                    params: {
                        idOrganization: params.idOrganization,
                        idYear: params.idYear,
                    },
                },
                {
                    label: "Paramètres",
                    icon: <IconSettings />,
                    to: "/organisations/$idOrganization/exercices/$idYear/paramètres",
                    params: {
                        idOrganization: params.idOrganization,
                        idYear: params.idYear,
                    },
                },
            ]}
        />
    )
}
