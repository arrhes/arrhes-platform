import { getAllMyOrganizationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBuildingPlus } from "@tabler/icons-react"
import { FormatNull } from "../../../components/formats/formatNull.tsx"
import { DataWrapper } from "../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../components/layouts/page/page.tsx"
import { AddNewOrganization } from "./addNewOrganization.tsx"
import { OrganizationCard } from "./organizationCard.tsx"


export function OrganizationsPage() {
    return (
        <Page.Root>
            <Page.Header>
                <Page.Title>
                    Mes organisations
                </Page.Title>
            </Page.Header>
            <Page.Content>
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "1rem"
                    })}
                >
                    <div
                        className={css({ width: "100%", display: "flex", justifyContent: "end", alignItems: "center" })}
                    >
                        <AddNewOrganization>
                            <ButtonContent
                                variant="default"
                                leftIcon={<IconBuildingPlus />}
                                text="Ajouter une organisation"
                            />
                        </AddNewOrganization>
                    </div>
                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            border: "1px solid",
                            borderColor: "neutral/10",
                            borderRadius: "lg",
                        })}
                    >
                        <DataWrapper
                            routeDefinition={getAllMyOrganizationsRouteDefinition}
                            body={{}}
                        >
                            {(organizationUsers) => {
                                if (organizationUsers.length === 0) {
                                    return (
                                        <FormatNull
                                            text="Aucune organisation"
                                            className={css({ padding: "1rem" })}
                                        />
                                    )
                                }
                                return (
                                    organizationUsers.map((organizationUser) => (
                                        <OrganizationCard
                                            key={organizationUser.id}
                                            organizationUser={organizationUser}
                                        />
                                    ))
                                )
                            }}
                        </DataWrapper>
                    </div>
                </div>
            </Page.Content>
        </Page.Root>
    )
}
