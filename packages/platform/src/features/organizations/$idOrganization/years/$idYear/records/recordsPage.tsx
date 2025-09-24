import { readAllRecordsRouteDefinition, readOneAttachmentRouteDefinition, readOneJournalRouteDefinition } from "@arrhes/schemas/routes"
import { IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { ButtonPlainContent } from "components/buttons/buttonPlainContent"
import { FormatDate } from "components/formats/formatDate"
import { FormatDateTime } from "components/formats/formatDateTime"
import { FormatNull } from "components/formats/formatNull"
import { FormatText } from "components/formats/formatText"
import { DataTable } from "components/layouts/dataTable"
import { DataWrapper } from "components/layouts/dataWrapper"
import { Page } from "components/layouts/page/page"
import { CreateOneRecord } from "features/organizations/$idOrganization/years/$idYear/records/createOneRecord"
import { platformRouter } from "routes/platformRouter"
import { recordsRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/records/recordsRoute"


export function RecordsPage() {
    const params = useParams({ from: recordsRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readAllRecordsRouteDefinition}
                    body={{
                        idOrganization: params.idOrganization,
                        idYear: params.idYear
                    }}
                >
                    {(records) => {
                        const recordsData = records
                            .sort((a, b) => b.date.localeCompare(a.date))

                        return (
                            <DataTable
                                data={recordsData}
                                isLoading={false}
                                columns={[
                                    {
                                        accessorKey: 'label',
                                        header: 'Libellé',
                                        cell: ({ row }) => (
                                            <FormatText>
                                                {row.original.label}
                                            </FormatText>
                                        ),
                                        filterFn: 'includesString'
                                    },
                                    {
                                        accessorKey: 'date',
                                        header: "Date",
                                        cell: ({ row }) => (
                                            <FormatDate
                                                date={row.original.date}
                                            />
                                        ),
                                        filterFn: 'includesString'
                                    },
                                    {
                                        accessorKey: 'idJournal',
                                        header: 'Journal',
                                        cell: ({ row }) => (row.original.idJournal === null)
                                            ? (<FormatNull />)
                                            : (
                                                <DataWrapper
                                                    routeDefinition={readOneJournalRouteDefinition}
                                                    body={{
                                                        idOrganization: params.idOrganization,
                                                        idYear: params.idYear,
                                                        idJournal: row.original.idJournal
                                                    }}
                                                >
                                                    {(journal) => (
                                                        <span>
                                                            {journal.code}
                                                        </span>
                                                    )}
                                                </DataWrapper>
                                            ),
                                        filterFn: 'includesString'
                                    },
                                    {
                                        accessorKey: 'idAttachment',
                                        header: 'Pièce justificative',
                                        cell: ({ row }) => (row.original.idAttachment === null)
                                            ? (<FormatNull />)
                                            : (
                                                <DataWrapper
                                                    routeDefinition={readOneAttachmentRouteDefinition}
                                                    body={{
                                                        idOrganization: params.idOrganization,
                                                        idYear: params.idYear,
                                                        idAttachment: row.original.idAttachment
                                                    }}
                                                >
                                                    {(attachment) => (
                                                        <span>
                                                            {attachment.reference}
                                                        </span>
                                                    )}
                                                </DataWrapper>
                                            ),
                                        filterFn: 'includesString'
                                    },
                                    {
                                        accessorKey: 'createdOn',
                                        header: "Ajouté le",
                                        cell: ({ row }) => (
                                            <FormatDateTime
                                                date={row.original.createdAt}
                                            />
                                        ),
                                        filterFn: 'includesString'
                                    },
                                    {
                                        accessorKey: 'lastUpdatedOn',
                                        header: "Dernière mise à jour le",
                                        cell: ({ row }) => (
                                            <FormatDateTime
                                                date={row.original.lastUpdatedAt}
                                            />
                                        ),
                                        filterFn: 'includesString'
                                    }
                                ]}
                                onRowClick={(row) => {
                                    platformRouter.navigate({
                                        to: "/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord",
                                        params: {
                                            idOrganization: row.original.idOrganization,
                                            idYear: row.original.idYear,
                                            idRecord: row.original.id
                                        }
                                    })
                                }}
                            >
                                <CreateOneRecord
                                    idOrganization={params.idOrganization}
                                    idYear={params.idYear}
                                >
                                    <ButtonPlainContent
                                        icon={<IconPlus />}
                                        text="Ajouter une écriture"
                                    />
                                </CreateOneRecord>
                            </DataTable>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}