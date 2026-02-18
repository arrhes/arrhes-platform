import { readOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../../components/layouts/settingsSection/settingsSection.tsx"
import { organizationSettingsRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSettings/organizationSettingsRoute.tsx"
import { DeleteOneOrganization } from "./deleteOneOrganization.tsx"
import { UpdateOneOrganization } from "./updateOneOrganization.tsx"

export function OrganizationSettingsPage() {
    const params = useParams({ from: organizationSettingsRoute.id })

    return (
        <Page.Root>
            {/* <Page.Header>
                <Page.Title>
                    Paramètres de l'organisation
                </Page.Title>
                <Page.Description>
                    Gérez les informations de base et la suppression de l'organisation.
                </Page.Description>
            </Page.Header> */}
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOneOrganizationRouteDefinition}
                    body={{
                        idOrganization: params.idOrganization,
                    }}
                >
                    {(organization) => {
                        return (
                            <div
                                className={css({
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                })}
                            >
                                <SettingsSection.Root>
                                    <SettingsSection.Header title="Informations générales" />
                                    <SettingsSection.Row
                                        title="Modifier les informations de l'organisation"
                                        description="Changez le nom, l'email ou encore le numéro de SIREN."
                                    >
                                        <UpdateOneOrganization organization={organization}>
                                            <ButtonOutlineContent leftIcon={<IconPencil />} text="Modifier" />
                                        </UpdateOneOrganization>
                                    </SettingsSection.Row>
                                </SettingsSection.Root>
                                <SettingsSection.Root variant="danger">
                                    <SettingsSection.Header title="Zone de danger" variant="danger" />
                                    <SettingsSection.Row
                                        title="Supprimer l'organisation"
                                        description="Cette action est irréversible."
                                        variant="danger"
                                    >
                                        <DeleteOneOrganization idOrganization={organization.id}>
                                            <ButtonOutlineContent leftIcon={<IconTrash />} text="Supprimer" color="danger" />
                                        </DeleteOneOrganization>
                                    </SettingsSection.Row>
                                </SettingsSection.Root>
                            </div>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
