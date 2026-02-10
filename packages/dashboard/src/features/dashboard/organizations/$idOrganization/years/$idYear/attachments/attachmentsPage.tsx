import { readAllAttachmentsRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconLayoutGrid, IconLayoutList } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { DataWrapper } from "../../../../../../../components/layouts/dataWrapper.js"
import { Page } from "../../../../../../../components/layouts/page/page.js"
import { attachmentsLayoutRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/attachments/attachmentsLayoutRoute.js"
import { css } from "../../../../../../../utilities/cn.js"
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
                    gap: "1",
                    mb: "4"
                })}>
                    <button
                        onClick={() => setViewMode("grid")}
                        className={css({
                            padding: "1rem",
                            borderRadius: "md",
                            border: "1px solid",
                            borderColor: viewMode === "grid" ? "primary" : "neutral/10",
                            backgroundColor: viewMode === "grid" ? "primary/10" : "transparent",
                            color: viewMode === "grid" ? "primary" : "neutral/60",
                            cursor: "pointer",
                            transition: "all 0.15s",
                            _hover: {
                                borderColor: "primary/50",
                                backgroundColor: "primary/5"
                            }
                        })}
                        title="Vue grille"
                    >
                        <IconLayoutGrid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={css({
                            padding: "1rem",
                            borderRadius: "md",
                            border: "1px solid",
                            borderColor: viewMode === "list" ? "primary" : "neutral/10",
                            backgroundColor: viewMode === "list" ? "primary/10" : "transparent",
                            color: viewMode === "list" ? "primary" : "neutral/60",
                            cursor: "pointer",
                            transition: "all 0.15s",
                            _hover: {
                                borderColor: "primary/50",
                                backgroundColor: "primary/5"
                            }
                        })}
                        title="Vue liste"
                    >
                        <IconLayoutList size={18} />
                    </button>
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
