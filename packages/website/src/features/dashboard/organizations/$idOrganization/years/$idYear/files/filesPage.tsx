import { readAllFilesRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconLayoutGrid, IconLayoutList } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { DataWrapper } from "../../../../../../../components/layouts/dataWrapper.js"
import { Page } from "../../../../../../../components/layouts/page/page.js"
import { filesLayoutRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/files/filesLayoutRoute.js"
import { FilesGrid } from "./filesGrid.js"
import { FilesTable } from "./filesTable.js"

type ViewMode = "grid" | "list"

export function FilesPage() {
    const params = useParams({ from: filesLayoutRoute.id })
    const [viewMode, setViewMode] = useState<ViewMode>("grid")

    return (
        <Page.Root>
            <Page.Content>
                {/* View toggle */}
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "0.25rem",
                    })}
                >
                    <Button onClick={() => setViewMode("grid")} title="Grille">
                        <ButtonContent leftIcon={<IconLayoutGrid />} isActive={viewMode === "grid"} />
                    </Button>
                    <Button onClick={() => setViewMode("list")} title="Liste">
                        <ButtonContent leftIcon={<IconLayoutList />} isActive={viewMode === "list"} />
                    </Button>
                </div>

                <DataWrapper
                    routeDefinition={readAllFilesRouteDefinition}
                    body={{
                        idOrganization: params.idOrganization,
                        idYear: params.idYear,
                    }}
                >
                    {(files) => {
                        if (viewMode === "grid") {
                            return (
                                <FilesGrid
                                    idOrganization={params.idOrganization}
                                    idYear={params.idYear}
                                    files={files}
                                />
                            )
                        }
                        return (
                            <FilesTable idOrganization={params.idOrganization} idYear={params.idYear} files={files} />
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
