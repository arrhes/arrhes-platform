import { readOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../../components/layouts/page/page.tsx"
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
                    <Page.Root>
                        <Page.Header>
                            <Page.Title>
                                Paramètres de l'organisation
                            </Page.Title>
                            <Page.Description>
                                Gérez les informations de base et la suppression de l'organisation.
                            </Page.Description>
                        </Page.Header>
                        <Page.Content>
                            <div className={css({
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1.5rem"
                            })}>
                                <div className={css({
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { base: "column", md: "row" },
                                    gap: "1.5rem",
                                    padding: "1.5rem",
                                    border: "1px solid",
                                    borderColor: "neutral/10",
                                    borderRadius: "lg",
                                    backgroundColor: "white"
                                })}>
                                    <div className={css({
                                        flex: "1",
                                        minWidth: "0",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.5rem"
                                    })}>
                                        <span className={css({ fontSize: "lg", fontWeight: "semibold" })}>
                                            Informations générales
                                        </span>
                                        <span className={css({ fontSize: "sm", color: "neutral/60" })}>
                                            Modifiez le nom, le statut et les données principales de l'organisation.
                                        </span>
                                    </div>
                                    <div className={css({
                                        flex: "2",
                                        minWidth: "0",
                                        display: "flex",
                                        flexDirection: "column",
                                        border: "1px solid",
                                        borderColor: "neutral/10",
                                        borderRadius: "md",
                                        overflow: "hidden"
                                    })}>
                                        <div className={css({
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: "1rem",
                                            paddingX: "1.25rem",
                                            paddingY: "1rem",
                                            backgroundColor: "white",
                                            borderBottom: "1px solid",
                                            borderBottomColor: "neutral/10"
                                        })}>
                                            <div className={css({ display: "flex", flexDirection: "column", gap: "0.25rem" })}>
                                                <span className={css({ fontSize: "sm", fontWeight: "semibold" })}>
                                                    Modifier l'organisation
                                                </span>
                                                <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                                                    Changez les informations principales.
                                                </span>
                                            </div>
                                            <UpdateOneOrganization organization={organization}>
                                                <ButtonContent
                                                    variant="default"
                                                    leftIcon={<IconPencil />}
                                                    text="Modifier"
                                                />
                                            </UpdateOneOrganization>
                                        </div>
                                    </div>
                                </div>
                                <div className={css({
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { base: "column", md: "row" },
                                    gap: "1.5rem",
                                    padding: "1.5rem",
                                    border: "1px solid",
                                    borderColor: "neutral/10",
                                    borderRadius: "lg",
                                    backgroundColor: "white"
                                })}>
                                    <div className={css({
                                        flex: "1",
                                        minWidth: "0",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.5rem"
                                    })}>
                                        <span className={css({ fontSize: "lg", fontWeight: "semibold", color: "error" })}>
                                            Zone de danger
                                        </span>
                                        <span className={css({ fontSize: "sm", color: "neutral/60" })}>
                                            Supprimez définitivement l'organisation et ses données.
                                        </span>
                                    </div>
                                    <div className={css({
                                        flex: "2",
                                        minWidth: "0",
                                        display: "flex",
                                        flexDirection: "column",
                                        border: "1px solid",
                                        borderColor: "error/20",
                                        borderRadius: "md",
                                        overflow: "hidden"
                                    })}>
                                        <div className={css({
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: "1rem",
                                            paddingX: "1.25rem",
                                            paddingY: "1rem",
                                            backgroundColor: "error/5"
                                        })}>
                                            <div className={css({ display: "flex", flexDirection: "column", gap: "0.25rem" })}>
                                                <span className={css({ fontSize: "sm", fontWeight: "semibold" })}>
                                                    Supprimer l'organisation
                                                </span>
                                                <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                                                    Cette action est irréversible.
                                                </span>
                                            </div>
                                            <DeleteOneOrganization idOrganization={organization.id}>
                                                <ButtonContent
                                                    variant="default"
                                                    leftIcon={<IconTrash />}
                                                    text="Supprimer"
                                                    color="error"
                                                />
                                            </DeleteOneOrganization>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Page.Content>
                    </Page.Root>
                )
            }}
        </DataWrapper>
    )
}
