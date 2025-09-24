import { readAllYearsRouteDefinition } from "@arrhes/schemas/routes"
import { IconCalendarPlus } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { ButtonPlainContent } from "components/buttons/buttonPlainContent"
import { FormatNull } from "components/formats/formatNull"
import { Box } from "components/layouts/box"
import { DataWrapper } from "components/layouts/dataWrapper"
import { Page } from "components/layouts/page/page"
import { CreateOneYear } from "features/organizations/$idOrganization/years/createOneYear"
import { yearsRoute } from "routes/root/auth/organizations/$idOrganization/years/yearsRoute"


export function YearsPage() {
    const params = useParams({ from: yearsRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <div className="w-full flex flex-col justify-start items-start gap-4">
                    <div className="w-full flex justify-between items-center">
                        <span className="text-2xl">
                            Exercices fiscaux
                        </span>
                        <CreateOneYear
                            idOrganization={params.idOrganization}
                        >
                            <ButtonPlainContent
                                icon={<IconCalendarPlus />}
                                text="Ajouter un exercice"
                            />
                        </CreateOneYear>
                    </div>
                    <Box>
                        <DataWrapper
                            routeDefinition={readAllYearsRouteDefinition}
                            body={{
                                idOrganization: params.idOrganization
                            }}
                        >
                            {(years) => {
                                if (years.length === 0) {
                                    return (
                                        <FormatNull
                                            text="Aucune exercice"
                                            className="p-4 w-full"
                                        />
                                    )
                                }
                                return (
                                    <div className="h-fit w-full flex flex-col justify-start items-start">
                                        {years.map((year) => {
                                            return (
                                                <Link
                                                    key={year.id}
                                                    to="/organisations/$idOrganization/exercices/$idYear"
                                                    params={{
                                                        idOrganization: params.idOrganization,
                                                        idYear: year.id
                                                    }}
                                                    className="w-full p-2 border-b border-neutral/10 last:border-none flex justify-start items-center hover:bg-neutral/5 cursor-pointer"
                                                >
                                                    {year.label}
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
