import { readAllAttachmentsRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonContent } from "@arrhes/ui"
import { IconLayoutGrid, IconLayoutList } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { DataWrapper } from "../../../../../../../components/layouts/dataWrapper.js"
import { Page } from "../../../../../../../components/layouts/page/page.js"
import { attachmentsLayoutRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/attachments/attachmentsLayoutRoute.js"
import { css } from "../../"@arrhes/ui/utilities / cn.js"
import { AttachmentsGrid } from "./attachmentsGrid.js"
import { AttachmentsTable } from "./attachmentsTable.js"


type ViewMode = "grid" | "list"


export function AttachmentsPage() {
    const params = useParams({ from: attachmentsLayoutRoute.id })
    const [viewMode, setViewMode] = useState<ViewMode>("grid")

    return (
        <Page.Root>
            <Page.Content>
                {/* View toggle */}
                <div className={css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "0.25rem",
                })}>
                    <Button
                        onClick={() => setViewMode("grid")}
                        title="Grille"
                    >
                        <ButtonContent
                            leftIcon={<IconLayoutGrid />}
                            isActive={viewMode === "grid"}
                        />
                    </Button>
                    <Button
                        onClick={() => setViewMode("list")}
                        title="Liste"
                    >
                        <ButtonContent
                            leftIcon={<IconLayoutList />}
                            isActive={viewMode === "list"}
                        />
                    </Button>
                </div>

                <DataWrapper
                    routeDefinition={readAllAttachmentsRouteDefinition}
                    body={{
                        idOrganization: params.idOrganization,
                        idYear: params.idYear,
                    }}
                >
                    {(attachments) => {
                        if (viewMode === "grid") {
                            return (
                                <AttachmentsGrid
                                    idOrganization={params.idOrganization}
                                    idYear={params.idYear}
                                    attachments={attachments}
                                />
                            )
                        }
                        return (
                            <AttachmentsTable
                                idOrganization={params.idOrganization}
                                idYear={params.idYear}
                                attachments={attachments}
                            />
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
