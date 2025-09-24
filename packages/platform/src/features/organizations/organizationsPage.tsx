import { getAllMyOrganizationsRouteDefinition } from "@arrhes/schemas/routes"
import { IconBuildingPlus } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { ButtonPlainContent } from "components/buttons/buttonPlainContent"
import { FormatNull } from "components/formats/formatNull"
import { Box } from "components/layouts/box"
import { DataWrapper } from "components/layouts/dataWrapper"
import { Page } from "components/layouts/page/page"
import { AddNewOrganization } from "features/organizations/addNewOrganization"


export function OrganizationsPage() {
    return (
        <Page.Root>
            <Page.Content>
                <div className="w-full flex flex-col justify-start items-start gap-4">
                    <div className="w-full flex justify-between items-center">
                        <span className="text-2xl">
                            Organisations
                        </span>
                        <AddNewOrganization>
                            <ButtonPlainContent
                                icon={<IconBuildingPlus />}
                                text="Ajouter une organisation"
                            />
                        </AddNewOrganization>
                    </div>
                    <Box>
                        <DataWrapper
                            routeDefinition={getAllMyOrganizationsRouteDefinition}
                            body={{}}
                        >
                            {(organizationUsers) => {
                                if (organizationUsers.length === 0) {
                                    return (
                                        <FormatNull
                                            text="Aucune organisation"
                                            className="p-2"
                                        />
                                    )
                                }
                                return (
                                    <div className="h-fit w-full flex flex-col justify-start items-start">
                                        {organizationUsers.map((organizationUser) => {
                                            return (
                                                <Link
                                                    key={organizationUser.id}
                                                    to="/organisations/$idOrganization"
                                                    params={{
                                                        idOrganization: organizationUser.organization.id
                                                    }}
                                                    className="w-full p-2 border-b border-neutral/10 last:border-none flex justify-start items-center hover:bg-neutral/5 cursor-pointer"
                                                >
                                                    {organizationUser.organization.name}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                )
                            }}
                        </DataWrapper>
                    </Box>
                </div>
            </Page.Content>
        </Page.Root>
    )
}