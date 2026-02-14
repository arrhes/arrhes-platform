import { readAllRecordRowsRouteDefinition, readAllRecordsRouteDefinition, readOneAccountRouteDefinition, readOneAttachmentRouteDefinition, readOneJournalRouteDefinition, readOneRecordLabelRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { IconEye, IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { FormatDate } from "../../../../../../../components/formats/formatDate.js"
import { FormatDateTime } from "../../../../../../../components/formats/formatDateTime.js"
import { FormatNull } from "../../../../../../../components/formats/formatNull.js"
import { FormatPrice } from "../../../../../../../components/formats/formatPrice.js"
import { FormatText } from "../../../../../../../components/formats/formatText.js"
import { DataTable } from "../../../../../../../components/layouts/dataTable.js"
import { DataWrapper } from "../../../../../../../components/layouts/dataWrapper.js"
import { Page } from "../../../../../../../components/layouts/page/page.js"
import { LinkButton } from "../../../../../../../components/linkButton.js"
import { recordsRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/records/recordsRoute.js"
import { css } from "../../"@arrhes/ui/utilities / cn.js"
import { CreateOneRecord } from "./createOneRecord.js"


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
                    {(records) => (
                        <DataWrapper
                            routeDefinition={readAllRecordRowsRouteDefinition}
                            body={{
                                idOrganization: params.idOrganization,
                                idYear: params.idYear
                            }}
                        >
                            {(recordRows) => {
                                const recordsData = [...records]
                                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

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
                                    <DataTable
                                        data={recordsData}
                                        isLoading={false}
                                        columns={[
                                            {
                                                accessorKey: 'actions',
                                                header: ' ',
                                                cell: ({ row }) => (
                                                    <LinkButton
                                                        to="/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord"
                                                        params={{
                                                            idOrganization: row.original.idOrganization,
                                                            idYear: row.original.idYear,
                                                            idRecord: row.original.id
                                                        }}
                                                    >
                                                        <ButtonContent
                                                            variant="invisible"
                                                            leftIcon={<IconEye />}
                                                            text={undefined}
                                                        />
                                                    </LinkButton>
                                                ),
                                                enableSorting: false,
                                                enableGlobalFilter: false,
                                            },
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
                                                accessorKey: 'lastUpdatedAt',
                                                header: "Dernière mise à jour le",
                                                cell: ({ row }) => (
                                                    <FormatDateTime
                                                        date={row.original.lastUpdatedAt}
                                                    />
                                                ),
                                                filterFn: 'includesString'
                                            }
                                        ]}
                                        renderSubComponent={({ row }) => {
                                            const rows = rowsByRecord.get(row.original.id)
                                            if (!rows || rows.length === 0) {
                                                return (
                                                    <FormatNull
                                                        text="Aucun mouvement"
                                                        className={css({ padding: "1rem" })}
                                                    />
                                                )
                                            }
                                            return (
                                                <table className={css({
                                                    width: "100%",
                                                    borderCollapse: "collapse"
                                                })}>
                                                    <thead>
                                                        <tr>
                                                            <th className={css({
                                                                padding: "0.5rem 1rem",
                                                                fontSize: "xs",
                                                                fontWeight: "semibold",
                                                                color: "neutral/40",
                                                                textAlign: "left"
                                                            })}>Compte</th>
                                                            <th className={css({
                                                                padding: "0.5rem 1rem",
                                                                fontSize: "xs",
                                                                fontWeight: "semibold",
                                                                color: "neutral/40",
                                                                textAlign: "left"
                                                            })}>Libellé</th>
                                                            <th className={css({
                                                                padding: "0.5rem 1rem",
                                                                fontSize: "xs",
                                                                fontWeight: "semibold",
                                                                color: "neutral/40",
                                                                textAlign: "right"
                                                            })}>Débit</th>
                                                            <th className={css({
                                                                padding: "0.5rem 1rem",
                                                                fontSize: "xs",
                                                                fontWeight: "semibold",
                                                                color: "neutral/40",
                                                                textAlign: "right"
                                                            })}>Crédit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {rows.map((recordRow) => (
                                                            <tr
                                                                key={recordRow.id}
                                                                className={css({
                                                                    borderTop: "1px solid",
                                                                    borderTopColor: "neutral/5"
                                                                })}
                                                            >
                                                                <td className={css({
                                                                    padding: "0.5rem 1rem"
                                                                })}>
                                                                    <DataWrapper
                                                                        routeDefinition={readOneAccountRouteDefinition}
                                                                        body={{
                                                                            idOrganization: params.idOrganization,
                                                                            idYear: params.idYear,
                                                                            idAccount: recordRow.idAccount
                                                                        }}
                                                                    >
                                                                        {(account) => (
                                                                            <div className={css({
                                                                                display: "flex",
                                                                                justifyContent: "flex-start",
                                                                                alignItems: "center",
                                                                                gap: "2"
                                                                            })}>
                                                                                <FormatText className={css({ overflow: "visible" })}>
                                                                                    {account.number}
                                                                                </FormatText>
                                                                                <FormatText wrap={true} className={css({ color: "neutral/50" })}>
                                                                                    {account.label}
                                                                                </FormatText>
                                                                            </div>
                                                                        )}
                                                                    </DataWrapper>
                                                                </td>
                                                                <td className={css({
                                                                    padding: "0.5rem 1rem"
                                                                })}>
                                                                    <FormatText>
                                                                        {recordRow.label}
                                                                    </FormatText>
                                                                </td>
                                                                <td className={css({
                                                                    padding: "0.5rem 1rem",
                                                                    textAlign: "right"
                                                                })}>
                                                                    <FormatPrice
                                                                        price={recordRow.debit}
                                                                    />
                                                                </td>
                                                                <td className={css({
                                                                    padding: "0.5rem 1rem",
                                                                    textAlign: "right"
                                                                })}>
                                                                    <FormatPrice
                                                                        price={recordRow.credit}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )
                                        }}
                                    >
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
                                    </DataTable>
                                )
                            }}
                        </DataWrapper>
                    )}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}