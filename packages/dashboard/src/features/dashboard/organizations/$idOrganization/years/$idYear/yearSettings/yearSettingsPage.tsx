import { readOneYearRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../../../../components/layouts/box.tsx"
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
                    <Box>
                        <div className={css({ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" })}>
                            <div className={css({ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4", padding: "4", borderBottom: "1px solid", borderColor: "neutral/10" })}>
                                <span>
                                    Modifier les informations de l'exercice
                                </span>
                                <UpdateOneYear
                                    year={year}
                                >
                                    <ButtonContent
                                        variant="default"
                                        leftIcon={<IconPencil />}
                                        text="Modifier"
                                    />
                                </UpdateOneYear>
                            </div>
                            <div className={css({ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4", padding: "4" })}>
                                <span>
                                    Supprimer l'exercice
                                </span>
                                <DeleteOneYear
                                    year={year}
                                >
                                    <ButtonContent
                                        variant="default"
                                        leftIcon={<IconTrash />}
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