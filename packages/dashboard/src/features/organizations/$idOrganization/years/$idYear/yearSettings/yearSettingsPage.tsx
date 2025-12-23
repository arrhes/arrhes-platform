import { ButtonOutlineContent } from "#/components/buttons/buttonOutlineContent.js"
import { Box } from "#/components/layouts/box.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { DeleteOneYear } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/deleteOneYear.js"
import { UpdateOneYear } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/updateOneYear.js"
import { yearSettingsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsRoute.js"
import { readOneYearRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"


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
                    <Box>
                        <div className="w-full flex flex-col justify-start items-start">
                            <div className="w-full flex justify-between items-center gap-4 p-4 border-b border-neutral/10">
                                <span>
                                    Modifier les informations de l'exercice
                                </span>
                                <UpdateOneYear
                                    year={year}
                                >
                                    <ButtonOutlineContent
                                        icon={<IconPencil />}
                                        text="Modifier"
                                    />
                                </UpdateOneYear>
                            </div>
                            <div className="w-full flex justify-between items-center gap-4 p-4">
                                <span>
                                    Supprimer l'exercice
                                </span>
                                <DeleteOneYear
                                    year={year}
                                >
                                    <ButtonOutlineContent
                                        icon={<IconTrash />}
                                        text="Supprimer"
                                        color="error"
                                    />
                                </DeleteOneYear>
                            </div>
                        </div>
                    </Box>
                )
            }}
        </DataWrapper>
    )
}