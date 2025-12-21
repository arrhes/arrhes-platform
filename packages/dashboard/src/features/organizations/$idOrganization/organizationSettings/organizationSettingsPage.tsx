import { ButtonOutlineContent } from "#/components/buttons/buttonOutlineContent.js"
import { Box } from "#/components/layouts/box.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { DeleteOneOrganization } from "#/features/organizations/$idOrganization/organizationSettings/deleteOneOrganization.js"
import { UpdateOneOrganization } from "#/features/organizations/$idOrganization/organizationSettings/updateOneOrganization.js"
import { organizationSettingsRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationSettings/organizationSettingsRoute.js"
import { readOneOrganizationRouteDefinition } from "@arrhes/metadata/routes"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"


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
