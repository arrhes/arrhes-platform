import { FormatDate } from "#/components/formats/formatDate.js"
import { FormatNull } from "#/components/formats/formatNull.js"
import { FormatPrice } from "#/components/formats/formatPrice.js"
import { FormatText } from "#/components/formats/formatText.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { Table } from "#/components/layouts/table/table.js"
import { readOneAccountRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"


export function JournalReportTable(props: {
    records: Array<v.InferOutput<typeof returnedSchemas.record>>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
}) {
    let totalDebit = props.recordRows.reduce((acc, recordRow) => acc + Number(recordRow.debit), 0)
    let totalCredit = props.recordRows.reduce((acc, recordRow) => acc + Number(recordRow.credit), 0)

    const sortedRecords = props.records
        // .filter((record) => record.isComputed)
        .sort((a, b) => b.date.localeCompare(a.date))

    return (
        <Table.Root>
            <Table.Header.Root>
                <Table.Header.Row>
                    <Table.Header.Cell>
                        <span className="text-neutral/75 text-sm">
                            Date
                        </span>
                    </Table.Header.Cell>
                    <Table.Header.Cell>
                        <span className="text-neutral/75 text-sm">
                            Libellé
                        </span>
                    </Table.Header.Cell>
                    <Table.Header.Cell>
                        <span className="text-neutral/75 text-sm">
                            Compte
                        </span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm whitespace-nowrap">
                            Débit
                        </span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm whitespace-nowrap">
                            Crédit
                        </span>
                    </Table.Header.Cell>
                </Table.Header.Row>
            </Table.Header.Root>
            <Table.Body.Root className="border-y border-neutral/10 last:border-b-0">
                <Table.Body.Row>
                    <Table.Body.Cell colSpan={2} />
                    <Table.Body.Cell align="right">
                        <span className="text-neutral/50">
                            Total
                        </span>
                    </Table.Body.Cell>
                    <Table.Body.Cell className="w-[1%]" align="right">
                        <FormatPrice
                            price={totalDebit}
                            className="font-bold"
                        />
                    </Table.Body.Cell>
                    <Table.Body.Cell className="w-[1%]" align="right">
                        <FormatPrice
                            price={totalCredit}
                            className="font-bold"
                        />
                    </Table.Body.Cell>
                </Table.Body.Row>
            </Table.Body.Root>
            <Fragment>
                {
                    (sortedRecords.length === 0)
                        ? (
                            <Table.Body.Root className="border-b border-neutral/10 last:border-b-0">
                                <Table.Body.Row>
                                    <Table.Body.Cell>
                                        <FormatNull />
                                    </Table.Body.Cell>
                                </Table.Body.Row>
                            </Table.Body.Root>
                        )
                        : sortedRecords.map((record) => {
                            const sortedRecordRows = props.recordRows
                                .filter((recordRow) => recordRow.idRecord === record.id)
                                .sort((a, b) => (a.lastUpdatedAt ?? "").localeCompare(b.lastUpdatedAt ?? ""))

                            return (
                                <Table.Body.Root key={record.id} className="border-y border-neutral/10 last:border-b-0">
                                    <Table.Body.Row className="border-neutral/10 bg-background">
                                        <Table.Body.Cell>
                                            <FormatDate date={record.date} />
                                        </Table.Body.Cell>
                                        <Table.Body.Cell colSpan={2}>
                                            <FormatText wrap={true}>
                                                {record.label}
                                            </FormatText>
                                        </Table.Body.Cell>
                                        <Table.Body.Cell colSpan={2} />
                                    </Table.Body.Row>
                                    <Fragment>
                                        {
                                            sortedRecordRows.map((recordRow) => {
                                                totalDebit += Number(recordRow.debit)
                                                totalCredit += Number(recordRow.credit)

                                                return (
                                                    <Table.Body.Row key={recordRow.id}>
                                                        <Table.Body.Cell />
                                                        <Table.Body.Cell>
                                                            <FormatText wrap={true}>
                                                                {recordRow.label}
                                                            </FormatText>
                                                        </Table.Body.Cell>
                                                        <Table.Body.Cell>
                                                            <DataWrapper
                                                                routeDefinition={readOneAccountRouteDefinition}
                                                                body={{
                                                                    idOrganization: recordRow.idOrganization,
                                                                    idYear: recordRow.idYear,
                                                                    idAccount: recordRow.idAccount
                                                                }}
                                                            >
                                                                {(account) => (
                                                                    <span>
                                                                        {`${account.number}`}
                                                                    </span>
                                                                )}
                                                            </DataWrapper>
                                                        </Table.Body.Cell>
                                                        <Table.Body.Cell className="w-[1%]" align="right">
                                                            <FormatPrice price={recordRow.debit} />
                                                        </Table.Body.Cell>
                                                        <Table.Body.Cell className="w-[1%]" align="right">
                                                            <FormatPrice price={recordRow.credit} />
                                                        </Table.Body.Cell>
                                                    </Table.Body.Row>
                                                )
                                            })
                                        }
                                    </Fragment>
                                </Table.Body.Root>
                            )
                        })
                }
            </Fragment>
        </Table.Root>
    )
}