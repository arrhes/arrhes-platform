import { FormatNull } from "#/components/formats/formatNull.js"
import { FormatPrice } from "#/components/formats/formatPrice.js"
import { FormatText } from "#/components/formats/formatText.js"
import { Table } from "#/components/layouts/table/table.js"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import * as v from "valibot"


export function BalanceReportTable(props: {
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
}) {

    const sortedAccounts = props.accounts
        .sort((a, b) => a.number.localeCompare(b.number))

    let accountsTotalDebit = 0
    let accountsTotalCredit = 0
    let accountsTotalBalanceDebit = 0
    let accountsTotalBalanceCredit = 0

    props.accounts.forEach((account) => {
        let accountTotalDebit = 0
        let accountTotalCredit = 0

        props.recordRows
            .filter((recordRow) => recordRow.idAccount === account.id)
            .forEach((recordRow) => {
                accountTotalDebit += Number(recordRow.debit)
                accountTotalCredit += Number(recordRow.credit)
            })

        accountsTotalDebit += accountTotalDebit
        accountsTotalCredit += accountTotalCredit

        const algebricBalance = accountTotalDebit - accountTotalCredit

        if (algebricBalance > 0) {
            accountsTotalBalanceDebit += Math.abs(algebricBalance)
        }

        if (algebricBalance < 0) {
            accountsTotalBalanceCredit += Math.abs(algebricBalance)
        }

    })

    return (
        <Table.Root>
            <Table.Header.Root>
                <Table.Header.Row>
                    <Table.Header.Cell>
                        <span className="text-neutral/75 text-sm">Compte</span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm whitespace-nowrap">Débit</span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm whitespace-nowrap">Crédit</span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm whitespace-nowrap">Solde débiteur</span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm whitespace-nowrap">Solde créditeur</span>
                    </Table.Header.Cell>
                </Table.Header.Row>
            </Table.Header.Root>
            <Table.Body.Root className="border-y border-neutral/10 last:border-b-0">
                <Table.Body.Row>
                    <Table.Body.Cell align="right">
                        <span className="text-neutral/50">Total</span>
                    </Table.Body.Cell>
                    <Table.Body.Cell className="w-[1%]" align="right">
                        <FormatPrice price={accountsTotalDebit} className="font-bold" />
                    </Table.Body.Cell>
                    <Table.Body.Cell className="w-[1%]" align="right">
                        <FormatPrice price={accountsTotalCredit} className="font-bold" />
                    </Table.Body.Cell>
                    <Table.Body.Cell className="w-[1%]" align="right">
                        <FormatPrice price={accountsTotalBalanceDebit} className="font-bold" />
                    </Table.Body.Cell>
                    <Table.Body.Cell className="w-[1%]" align="right">
                        <FormatPrice price={accountsTotalBalanceCredit} className="font-bold" />
                    </Table.Body.Cell>
                </Table.Body.Row>
            </Table.Body.Root>
            <Table.Body.Root>
                {
                    (sortedAccounts.length === 0)
                        ? (
                            <Table.Body.Row>
                                <Table.Body.Cell>
                                    <FormatNull />
                                </Table.Body.Cell>
                            </Table.Body.Row>
                        )
                        : sortedAccounts.map((account) => {
                            const filteredRecordRows = props.recordRows
                                .filter((recordRow) => recordRow.idAccount === account.id)

                            if (filteredRecordRows.length === 0) {
                                return (null)
                            }

                            const accountTotalDebit = filteredRecordRows.reduce((acc, recordRow) => acc + Number(recordRow.debit), 0)
                            const accountTotalCredit = filteredRecordRows.reduce((acc, recordRow) => acc + Number(recordRow.credit), 0)

                            const algebricBalance = filteredRecordRows.reduce((acc, recordRow) => {
                                return (acc + Number(recordRow.debit) - Number(recordRow.credit))
                            }, 0)

                            const accountTotalBalanceDebit = (algebricBalance > 0) ? algebricBalance : 0
                            const accountTotalBalanceCredit = (algebricBalance < 0) ? -algebricBalance : 0

                            // accountsTotalDebit += accountTotalDebit
                            // accountsTotalCredit += accountTotalCredit
                            // accountsTotalBalanceDebit += accountTotalBalanceDebit
                            // accountsTotalBalanceCredit += accountTotalBalanceCredit

                            return (
                                <Table.Body.Row key={account.id} className="border-neutral/5">
                                    <Table.Body.Cell className="flex justify-start items-start gap-2">
                                        <FormatText className="overflow-visible">
                                            {account.number}
                                        </FormatText>
                                        <FormatText wrap={true} className="text-neutral/50">
                                            {account.label}
                                        </FormatText>
                                    </Table.Body.Cell>
                                    <Table.Body.Cell className="w-[1%]" align="right">
                                        <FormatPrice price={accountTotalDebit} />
                                    </Table.Body.Cell>
                                    <Table.Body.Cell className="w-[1%]" align="right">
                                        <FormatPrice price={accountTotalCredit} />
                                    </Table.Body.Cell>
                                    <Table.Body.Cell className="w-[1%]" align="right">
                                        <FormatPrice price={accountTotalBalanceDebit} />
                                    </Table.Body.Cell>
                                    <Table.Body.Cell className="w-[1%]" align="right">
                                        <FormatPrice price={accountTotalBalanceCredit} />
                                    </Table.Body.Cell>
                                </Table.Body.Row>
                            )
                        })
                }
            </Table.Body.Root>
        </Table.Root>
    )
}