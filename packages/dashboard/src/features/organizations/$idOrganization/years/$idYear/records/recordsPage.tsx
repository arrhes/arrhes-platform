import { ButtonPlainContent } from "#/components/buttons/buttonPlainContent.js"
import { FormatDate } from "#/components/formats/formatDate.js"
import { FormatDateTime } from "#/components/formats/formatDateTime.js"
import { FormatNull } from "#/components/formats/formatNull.js"
import { FormatText } from "#/components/formats/formatText.js"
import { DataTable } from "#/components/layouts/dataTable.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { Page } from "#/components/layouts/page/page.js"
import { CreateOneRecord } from "#/features/organizations/$idOrganization/years/$idYear/records/createOneRecord.js"
import { platformRouter } from "#/routes/platformRouter.js"
import { recordsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/records/recordsRoute.js"
import { readAllRecordsRouteDefinition, readOneAttachmentRouteDefinition, readOneJournalRouteDefinition, readOneRecordLabelRouteDefinition } from "@arrhes/metadata/routes"
import { IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"


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
                                                        <FormatText>
                                                            {journal.code}
                                                        </FormatText>
                                                    )}
                                                </DataWrapper>
                                            ),
                                        filterFn: 'includesString'
                                    },
                                    {
                                        accessorKey: 'idRecordLabel',
                                        header: 'Catégorie',
                                        cell: ({ row }) => (row.original.idRecordLabel === null)
                                            ? (<FormatNull />)
                                            : (
                                                <DataWrapper
                                                    routeDefinition={readOneRecordLabelRouteDefinition}
                                                    body={{
                                                        idOrganization: params.idOrganization,
                                                        idYear: params.idYear,
                                                        idRecordLabel: row.original.idRecordLabel
                                                    }}
                                                >
                                                    {(recordLabel) => (
                                                        <FormatText>
                                                            {recordLabel.label}
                                                        </FormatText>
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
                                                        <FormatText>
                                                            {attachment.reference}
                                                        </FormatText>
                                                    )}
                                                </DataWrapper>
                                            ),
                                        filterFn: 'includesString'
                                    },
                                    {
                                        accessorKey: 'createdAt',
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