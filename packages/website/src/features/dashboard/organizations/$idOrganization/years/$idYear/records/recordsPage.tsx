import { readAllRecordRowsRouteDefinition, readAllRecordsRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDownload, IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../../../components/layouts/dataWrapper.js"
import { Page } from "../../../../../../../components/layouts/page/page.js"
import { recordsRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/records/recordsRoute.js"
import { CreateOneRecord } from "./createOneRecord.js"
import { ExportRecordRows } from "./exportRecordRows.js"
import { RecordsTable } from "./recordsTable.js"

export function RecordsPage() {
    const params = useParams({ from: recordsRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readAllRecordsRouteDefinition}
                    body={{
                        idOrganization: params.idOrganization,
                        idYear: params.idYear,
                    }}
                >
                    {(records) => (
                        <DataWrapper
                            routeDefinition={readAllRecordRowsRouteDefinition}
                            body={{
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }}
                        >
                            {(recordRows) => {
                                const recordsData = [...records].sort(
                                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
                                )

                                const rowsByRecord = new Map<string, typeof recordRows>()
                                for (const row of recordRows) {
                                    const existing = rowsByRecord.get(row.idRecord)
                                    if (existing) {
                                        existing.push(row)
                                    } else {
                                        rowsByRecord.set(row.idRecord, [row])
                                    }
                                }

                                return (
                                    <div className={css({ width: "100%", minWidth: "0" })}>
                                        <div
                                            className={css({
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "end",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                            })}
                                        >
                                            <ExportRecordRows
                                                idOrganization={params.idOrganization}
                                                idYear={params.idYear}
                                                records={records}
                                                recordRows={recordRows}
                                            >
                                                <ButtonContent
                                                    variant="invisible"
                                                    leftIcon={<IconDownload />}
                                                    // text="Exporter"
                                                />
                                            </ExportRecordRows>
                                            <CreateOneRecord
                                                idOrganization={params.idOrganization}
                                                idYear={params.idYear}
                                            >
                                                <ButtonContent
                                                    variant="primary"
                                                    leftIcon={<IconPlus />}
                                                    text="Ajouter une écriture"
                                                />
                                            </CreateOneRecord>
                                        </div>
                                        <RecordsTable
                                            idOrganization={params.idOrganization}
                                            idYear={params.idYear}
                                            records={records}
                                            recordRows={recordRows}
                                        />
                                    </div>
                                )
                            }}
                        </DataWrapper>
                    )}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
