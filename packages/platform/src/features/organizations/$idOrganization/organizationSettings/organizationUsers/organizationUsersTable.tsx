import { readAllOrganizationUsersRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { ButtonOutlineContent } from "components/buttons/buttonOutlineContent"
import { FormatNull } from "components/formats/formatNull"
import { Box } from "components/layouts/box"
import { DataWrapper } from "components/layouts/dataWrapper"
import { DeleteOneOrganizationUser } from "features/organizations/$idOrganization/organizationSettings/organizationUsers/$idOrganizationUser/deleteOneOrganizationUser"
import { UpdateOneOrganizationUser } from "features/organizations/$idOrganization/organizationSettings/organizationUsers/$idOrganizationUser/updateOneOrganizationUser"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"


export function OrganizationUsersTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
}) {
    return (
        <Box>
            <DataWrapper
                routeDefinition={readAllOrganizationUsersRouteDefinition}
                body={{
                    idOrganization: props.idOrganization
                }}
            >
                {(organizationUsers) => {
                    if (organizationUsers.length === 0) {
                        return (
                            <FormatNull
                                text="Aucune organisation"
                                className="p-4"
                            />
                        )
                    }
                    return (
                        <Fragment>
                            {organizationUsers.map((organizationUser) => {
                                return (
                                    <div
                                        key={organizationUser.id}
                                        className="w-full p-4 border-b border-neutral/10 last:border-none flex flex-start justify-between items-center"
                                    >
                                        <span>
                                            {organizationUser.user.email}
                                        </span>
                                        <div className="flex justify-center items-center gap-2">
                                            <UpdateOneOrganizationUser
                                                organizationUser={organizationUser}
                                            >
                                                <ButtonOutlineContent
                                                    icon={<IconPencil />}
                                                    title="Modifier l'utilisateur"
                                                />
                                            </UpdateOneOrganizationUser>
                                            <DeleteOneOrganizationUser
                                                organizationUser={organizationUser}
                                            >
                                                <ButtonOutlineContent
                                                    icon={<IconTrash />}
                                                    title="Supprimer l'utilisateur"
                                                    color="error"
                                                />
                                            </DeleteOneOrganizationUser>
                                        </div>
                                    </div>
                                )
                            })}
                        </Fragment>
                    )
                }}
            </DataWrapper>
        </Box>
    )
}
