import { readOneOrganizationRouteDefinition } from "@arrhes/schemas/routes"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { ButtonOutlineContent } from "components/buttons/buttonOutlineContent"
import { Box } from "components/layouts/box"
import { DataWrapper } from "components/layouts/dataWrapper"
import { DeleteOneOrganization } from "features/organizations/$idOrganization/organizationSettings/deleteOneOrganization"
import { UpdateOneOrganization } from "features/organizations/$idOrganization/organizationSettings/updateOneOrganization"
import { organizationSettingsRoute } from "routes/root/auth/organizations/$idOrganization/organizationSettings/organizationSettingsRoute"


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
                        <div className="w-full flex flex-col justify-start items-start">
                            <div className="w-full flex justify-between items-center gap-4 p-4 border-b border-neutral/10">
                                <span>
                                    Modifier les informations de l'organisation
                                </span>
                                <UpdateOneOrganization
                                    organization={organization}
                                >
                                    <ButtonOutlineContent
                                        icon={<IconPencil />}
                                        text="Modifier l'organisation"
                                    />
                                </UpdateOneOrganization>
                            </div>
                            <div className="w-full flex justify-between items-center gap-4 p-4">
                                <span>
                                    Supprimer l'organisation
                                </span>
                                <DeleteOneOrganization idOrganization={organization.id}>
                                    <ButtonOutlineContent
                                        icon={<IconTrash />}
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
