import { readAllYearsRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCalendarPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { FormatNull } from "../../../../../components/formats/formatNull.tsx"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { yearsRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/yearsRoute.tsx"
import { CreateOneYear } from "./createOneYear.tsx"
import { YearCard } from "./yearCard.tsx"


export function YearsPage() {
    const params = useParams({ from: yearsRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <div className={css({ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "4" })}>
                    <div className={css({ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" })}>
                        <span className={css({ fontSize: "2xl" })}>
                            Exercices fiscaux
                        </span>
                        <CreateOneYear
                            idOrganization={params.idOrganization}
                        >
                            <ButtonContent
                                variant="default"
                                leftIcon={<IconCalendarPlus />}
                                text="Ajouter un exercice"
                            />
                        </CreateOneYear>
                    </div>
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
                                        text="Aucun exercice"
                                        className={css({ p: "4", width: "100%" })}
                                    />
                                )
                            }
                            return (
                                <div className={css({ width: "100%", display: "flex", flexDirection: "column", gap: "3" })}>
                                    {years.map((year) => (
                                        <YearCard
                                            key={year.id}
                                            year={year}
                                            idOrganization={params.idOrganization}
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
