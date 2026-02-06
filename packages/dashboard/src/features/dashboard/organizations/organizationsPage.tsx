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
            <Page.Content>
                <div className={css({ w: "full", display: "flex", flexDir: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "4" })}>
                    <div className={css({ w: "full", display: "flex", justifyContent: "space-between", alignItems: "center" })}>
                        <span className={css({ fontSize: "2xl" })}>
                            Mes organisations
                        </span>
                        <AddNewOrganization>
                            <ButtonContent
                                variant="default"
                                icon={<IconBuildingPlus />}
                                text="Ajouter une organisation"
                            />
                        </AddNewOrganization>
                    </div>
                    <DataWrapper
                        routeDefinition={getAllMyOrganizationsRouteDefinition}
                        body={{}}
                    >
                        {(organizationUsers) => {
                            if (organizationUsers.length === 0) {
                                return (
                                    <FormatNull
                                        text="Aucune organisation"
                                        className={css({ p: "2" })}
                                    />
                                )
                            }
                            return (
                                <div className={css({ w: "full", display: "flex", flexDir: "column", gap: "3" })}>
                                    {organizationUsers.map((organizationUser) => (
                                        <OrganizationCard
                                            key={organizationUser.id}
                                            organizationUser={organizationUser}
                                        />
                                    ))}
                                </div>
                            )
                        }}
                    </DataWrapper>
                </div>
            </Page.Content>
        </Page.Root>
    )
}
