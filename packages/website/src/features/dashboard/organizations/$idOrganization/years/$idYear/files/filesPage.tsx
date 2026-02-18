import { readAllFilesRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconLayoutGrid, IconLayoutList, IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { DataWrapper } from "../../../../../../../components/layouts/dataWrapper.js"
import { Page } from "../../../../../../../components/layouts/page/page.js"
import { filesLayoutRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/files/filesLayoutRoute.js"
import { CreateOneFile } from "./createOneFile.js"
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
                        gap: "0.5rem",
                    })}
                >
                    <Button onClick={() => setViewMode("grid")} title="Grille">
                        <ButtonOutlineContent leftIcon={<IconLayoutGrid />} isActive={viewMode === "grid"} />
                    </Button>
                    <Button onClick={() => setViewMode("list")} title="Liste">
                        <ButtonOutlineContent leftIcon={<IconLayoutList />} isActive={viewMode === "list"} />
                    </Button>
                    <CreateOneFile idOrganization={params.idOrganization} idYear={params.idYear}>
                        <ButtonPlainContent leftIcon={<IconPlus />} text="Ajouter un fichier" />
                    </CreateOneFile>
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
