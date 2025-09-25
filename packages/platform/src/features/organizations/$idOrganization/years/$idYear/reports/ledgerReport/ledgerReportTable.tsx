import { FormatNull } from "#/components/formats/formatNull.js"
import { FormatPrice } from "#/components/formats/formatPrice.js"
import { FormatText } from "#/components/formats/formatText.js"
import { Table } from "#/components/layouts/table/table.js"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"


export function LedgerReportTable(props: {
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
}) {

    let accountsTotalDebit = props.recordRows.reduce((acc, recordRow) => acc + Number(recordRow.debit), 0)
    let accountsTotalCredit = props.recordRows.reduce((acc, recordRow) => acc + Number(recordRow.credit), 0)

    const sortedAccounts = props.accounts.sort((a, b) => a.number.localeCompare(b.number))

    return (
        <Table.Root>
            <Table.Header.Root>
                <Table.Header.Row>
                    <Table.Header.Cell>
                        <span className="text-neutral/75 text-sm">Compte</span>
                    </Table.Header.Cell>
                    {/* <Table.Header.Cell>
                                <span className="text-neutral/75 text-sm">Date</span>
                            </Table.Header.Cell> */}
                    <Table.Header.Cell>
                        <span className="text-neutral/75 text-sm">Libellé</span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm whitespace-nowrap">Débit</span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm whitespace-nowrap">Crédit</span>
                    </Table.Header.Cell>
                </Table.Header.Row>
            </Table.Header.Root>
            <Table.Body.Root className="border-y border-neutral/20 last:border-b-0">
                <Table.Body.Row className="bg-background">
                    <Table.Body.Cell colSpan={1} />
                    <Table.Body.Cell align="right">
                        <span className="text-neutral/50">
                            Total
                        </span>
                    </Table.Body.Cell>
                    <Table.Body.Cell className="w-[1%]" align="right">
                        <FormatPrice
                            price={accountsTotalDebit}
                            className="font-bold"
                        />
                    </Table.Body.Cell>
                    <Table.Body.Cell className="w-[1%]" align="right">
                        <FormatPrice
                            price={accountsTotalCredit}
                            className="font-bold"
                        />
                    </Table.Body.Cell>
                </Table.Body.Row>
            </Table.Body.Root>
            <Fragment>
                {
                    (sortedAccounts.length === 0)
                        ? (
                            <Table.Body.Root className="border-b border-neutral/10 last:border-b-0">
                                <Table.Body.Row>
                                    <Table.Body.Cell>
                                        <FormatNull />
                                    </Table.Body.Cell>
                                </Table.Body.Row>
                            </Table.Body.Root>
                        )
                        : sortedAccounts.map((account) => {
                            const filteredRecordRows = props.recordRows
                                .filter((recordRow) => recordRow.idAccount === account.id)
                            // .sort((a, b) => a.createdAt.localeCompare(b.createdAt)) 

                            if (filteredRecordRows.length === 0) {
                                return (null)
                            }

                            const accountTotalDebit = filteredRecordRows.reduce((acc, recordRow) => acc + Number(recordRow.debit), 0)
                            const accountTotalCredit = filteredRecordRows.reduce((acc, recordRow) => acc + Number(recordRow.credit), 0)

                            accountsTotalDebit += accountTotalDebit
                            accountsTotalCredit += accountTotalCredit

                            return (
                                <Table.Body.Root
                                    key={account.id}
                                    className="border-y border-neutral/10 last:border-b-0"
                                >
                                    <Table.Body.Row className="border-neutral/10 bg-background">
                                        <Table.Body.Cell colSpan={2}>
                                            <FormatText wrap={true}>
                                                {account.number}
                                            </FormatText>
                                        </Table.Body.Cell>
                                        <Table.Body.Cell className="w-[1%]" align="right">
                                            <FormatPrice price={accountTotalDebit} className="font-bold" />
                                        </Table.Body.Cell>
                                        <Table.Body.Cell className="w-[1%]" align="right">
                                            <FormatPrice price={accountTotalCredit} className="font-bold" />
                                        </Table.Body.Cell>
                                    </Table.Body.Row>
                                    <Fragment>
                                        {
                                            filteredRecordRows.map((recordRow) => {
                                                return (
                                                    <Table.Body.Row key={recordRow.id} className="border-neutral/5">
                                                        <Table.Body.Cell />
                                                        <Table.Body.Cell>
                                                            <FormatText wrap={true}>
                                                                {recordRow.label}
                                                            </FormatText>
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