import { readOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../../components/layouts/box.tsx"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { organizationSettingsRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSettings/organizationSettingsRoute.tsx"
import { DeleteOneOrganization } from "./deleteOneOrganization.tsx"
import { UpdateOneOrganization } from "./updateOneOrganization.tsx"


export function OrganizationSettingsPage() {
    const params = useParams({ from: organizationSettingsRoute.id })

    return (
        <DataWrapper
            routeDefinition={readOneOrganizationRouteDefinition}
            body={{
                idOrganization: params.idOrganization
            }}
        >
            {(organization) => {
                return (
                    <Box>
                        <div className={css({ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" })}>
                            <div className={css({ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4", padding: "4", borderBottom: "1px solid", borderColor: "neutral/10" })}>
                                <span>
                                    Modifier les informations de l'organisation
                                </span>
                                <UpdateOneOrganization
                                    organization={organization}
                                >
                                    <ButtonContent
                                        variant="default"
                                        leftIcon={<IconPencil />}
                                        text="Modifier l'organisation"
                                    />
                                </UpdateOneOrganization>
                            </div>
                            <div className={css({ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4", padding: "4" })}>
                                <span>
                                    Supprimer l'organisation
                                </span>
                                <DeleteOneOrganization idOrganization={organization.id}>
                                    <ButtonContent
                                        variant="default"
                                        leftIcon={<IconTrash />}
                                        text="Supprimer l'organisation"
                                        color="error"
                                    />
                                </DeleteOneOrganization>
                            </div>
                        </div>
                    </Box>
                )
            }}
        </DataWrapper>
    )
}
