import { readOneYearRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../../../../components/layouts/page/page.tsx"
import { DataWrapper } from "../../../../../../../components/layouts/dataWrapper.tsx"
import { yearSettingsRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsRoute.tsx"
import { DeleteOneYear } from "./deleteOneYear.tsx"
import { UpdateOneYear } from "./updateOneYear.tsx"


export function YearSettingsPage() {
    const params = useParams({ from: yearSettingsRoute.id })

    return (
        <DataWrapper
            routeDefinition={readOneYearRouteDefinition}
            body={{
                idOrganization: params.idOrganization,
                idYear: params.idYear
            }}
        >
            {(year) => {
                return (
                    <Page.Root>
                        <Page.Header>
                            <Page.Title>
                                Paramètres de l'exercice
                            </Page.Title>
                            <Page.Description>
                                Modifiez les informations générales et supprimez l'exercice si besoin.
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
                                            Modifiez le nom, la période et le statut de l'exercice.
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
                                                    Modifier l'exercice
                                                </span>
                                                <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                                                    Mettez à jour les informations principales.
                                                </span>
                                            </div>
                                            <UpdateOneYear year={year}>
                                                <ButtonContent
                                                    variant="default"
                                                    leftIcon={<IconPencil />}
                                                    text="Modifier"
                                                />
                                            </UpdateOneYear>
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
                                            Supprimez définitivement cet exercice et ses écritures.
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
                                                    Supprimer l'exercice
                                                </span>
                                                <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                                                    Cette action est irréversible.
                                                </span>
                                            </div>
                                            <DeleteOneYear year={year}>
                                                <ButtonContent
                                                    variant="default"
                                                    leftIcon={<IconTrash />}
                                                    text="Supprimer"
                                                    color="error"
                                                />
                                            </DeleteOneYear>
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