import {
    readAllAccountsRouteDefinition,
    readAllFilesRouteDefinition,
    readAllJournalsRouteDefinition,
    readAllRecordLabelsRouteDefinition,
    readAllRecordRowsRouteDefinition,
    readAllRecordsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { Button, ButtonGhostContent, ButtonPlainContent, CircularLoader } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDownload, IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useMemo } from "react"
import { FormatError } from "../../../../../../../components/formats/formatError.js"
import { Page } from "../../../../../../../components/layouts/page/page.js"
import { recordsRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/records/recordsRoute.js"
import { useDataFromAPI } from "../../../../../../../utilities/useHTTPData.js"
import { CreateOneRecord } from "./createOneRecord.js"
import { ExportRecordRows } from "./exportRecordRows.js"
import { RecordsTable } from "./recordsTable.js"

export function RecordsPage() {
    const params = useParams({ from: recordsRoute.id })

    const body = useMemo(
        () => ({
            idYear: params.idYear,
        }),
        [params.idYear],
    )

    const recordsQuery = useDataFromAPI({
        routeDefinition: readAllRecordsRouteDefinition,
        body,
    })

    const recordRowsQuery = useDataFromAPI({
        routeDefinition: readAllRecordRowsRouteDefinition,
        body,
    })

    const journalsQuery = useDataFromAPI({
        routeDefinition: readAllJournalsRouteDefinition,
        body,
    })

    const recordLabelsQuery = useDataFromAPI({
        routeDefinition: readAllRecordLabelsRouteDefinition,
        body,
    })

    const filesQuery = useDataFromAPI({
        routeDefinition: readAllFilesRouteDefinition,
        body,
    })

    const accountsQuery = useDataFromAPI({
        routeDefinition: readAllAccountsRouteDefinition,
        body,
    })

    const isPending =
        recordsQuery.isPending ||
        recordRowsQuery.isPending ||
        journalsQuery.isPending ||
        recordLabelsQuery.isPending ||
        filesQuery.isPending ||
        accountsQuery.isPending

    const isError =
        recordsQuery.data === undefined ||
        recordRowsQuery.data === undefined ||
        journalsQuery.data === undefined ||
        recordLabelsQuery.data === undefined ||
        filesQuery.data === undefined ||
        accountsQuery.data === undefined

    if (isPending) {
        return <CircularLoader text="Chargement des données..." className={css({ padding: "1rem" })} />
    }

    if (isError) {
        return <FormatError text="Erreur lors de la récupération des données." className={css({ padding: "1rem" })} />
    }

    const records = recordsQuery.data
    const recordRows = recordRowsQuery.data
    const journals = journalsQuery.data
    const recordLabels = recordLabelsQuery.data
    const files = filesQuery.data
    const accounts = accountsQuery.data

    return (
        <Page.Root>
            <Page.Content>
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
                            <Button>
                                <ButtonGhostContent
                                    leftIcon={<IconDownload />}
                                    // text="Exporter"
                                />
                            </Button>
                        </ExportRecordRows>
                        <CreateOneRecord idOrganization={params.idOrganization} idYear={params.idYear}>
                            <Button>
                                <ButtonPlainContent leftIcon={<IconPlus />} text="Ajouter une écriture" />
                            </Button>
                        </CreateOneRecord>
                    </div>
                    <RecordsTable
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                        records={records}
                        recordRows={recordRows}
                        journals={journals}
                        recordLabels={recordLabels}
                        files={files}
                        accounts={accounts}
                    />
                </div>
            </Page.Content>
        </Page.Root>
    )
}
