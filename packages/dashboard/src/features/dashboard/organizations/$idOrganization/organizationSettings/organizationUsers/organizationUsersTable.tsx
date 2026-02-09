import { readAllOrganizationUsersRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"
import { FormatNull } from "../../../../../../components/formats/formatNull.tsx"
import { Box } from "../../../../../../components/layouts/box.tsx"
import { DataWrapper } from "../../../../../../components/layouts/dataWrapper.tsx"
import { DeleteOneOrganizationUser } from "./$idOrganizationUser/deleteOneOrganizationUser.tsx"
import { UpdateOneOrganizationUser } from "./$idOrganizationUser/updateOneOrganizationUser.tsx"


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
                                className={css({ p: "4" })}
                            />
                        )
                    }
                    return (
                        <Fragment>
                            {organizationUsers.map((organizationUser) => {
                                return (
                                    <div
                                        key={organizationUser.id}
                                        className={css({ width: "100%", p: "4", borderBottom: "1px solid", borderColor: "neutral/10", _last: { borderBottom: "none" }, display: "flex", justifyContent: "space-between", alignItems: "center" })}
                                    >
                                        <span>
                                            {organizationUser.user.email}
                                        </span>
                                        <div className={css({ display: "flex", justifyContent: "center", alignItems: "center", gap: "2" })}>
                                            <UpdateOneOrganizationUser
                                                organizationUser={organizationUser}
                                            >
                                                <ButtonContent
                                                    variant="default"
                                                    leftIcon={<IconPencil />}
                                                    title="Modifier l'utilisateur"
                                                />
                                            </UpdateOneOrganizationUser>
                                            <DeleteOneOrganizationUser
                                                organizationUser={organizationUser}
                                            >
                                                <ButtonContent
                                                    variant="default"
                                                    leftIcon={<IconTrash />}
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
