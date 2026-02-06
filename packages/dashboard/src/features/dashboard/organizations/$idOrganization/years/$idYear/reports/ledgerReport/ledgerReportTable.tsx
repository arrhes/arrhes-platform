import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"
import { FormatNull } from "../../../../../../../../components/formats/formatNull.tsx"
import { FormatPrice } from "../../../../../../../../components/formats/formatPrice.tsx"
import { FormatText } from "../../../../../../../../components/formats/formatText.tsx"
import { Table } from "../../../../../../../../components/layouts/table/table.tsx"


export function LedgerReportTable(props: {
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
}) {

    const accountsTotalDebit = props.recordRows.reduce((acc, recordRow) => acc + Number(recordRow.debit), 0)
    const accountsTotalCredit = props.recordRows.reduce((acc, recordRow) => acc + Number(recordRow.credit), 0)

    const sortedAccounts = props.accounts.sort((a, b) => a.number.localeCompare(b.number))

    return (
        <Table.Root>
            <Table.Header.Root>
                <Table.Header.Row>
                    <Table.Header.Cell>
                        <span className={css({ color: "neutral/75", fontSize: "sm" })}>Compte</span>
                    </Table.Header.Cell>
                    {/* <Table.Header.Cell>
                                <span className={css({ color: "neutral/75", fontSize: "sm" })}>Date</span>
                            </Table.Header.Cell> */}
                    <Table.Header.Cell>
                        <span className={css({ color: "neutral/75", fontSize: "sm" })}>Libellé</span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className={css({ w: "[1%]" })} align="right">
                        <span className={css({ color: "neutral/75", fontSize: "sm", whiteSpace: "nowrap" })}>Débit</span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className={css({ w: "[1%]" })} align="right">
                        <span className={css({ color: "neutral/75", fontSize: "sm", whiteSpace: "nowrap" })}>Crédit</span>
                    </Table.Header.Cell>
                </Table.Header.Row>
            </Table.Header.Root>
            <Table.Body.Root className={css({ borderY: "1px solid token(colors.neutral/20)", _last: { borderBottom: "0" } })}>
                <Table.Body.Row className={css({ bg: "background" })}>
                    <Table.Body.Cell colSpan={1} />
                    <Table.Body.Cell align="right">
                        <span className={css({ color: "neutral/50" })}>
                            Total
                        </span>
                    </Table.Body.Cell>
                    <Table.Body.Cell className={css({ w: "[1%]" })} align="right">
                        <FormatPrice
                            price={accountsTotalDebit}
                            className={css({ fontWeight: "bold" })}
                        />
                    </Table.Body.Cell>
                    <Table.Body.Cell className={css({ w: "[1%]" })} align="right">
                        <FormatPrice
                            price={accountsTotalCredit}
                            className={css({ fontWeight: "bold" })}
                        />
                    </Table.Body.Cell>
                </Table.Body.Row>
            </Table.Body.Root>
            <Fragment>
                {
                    (sortedAccounts.length === 0)
                        ? (
                            <Table.Body.Root className={css({ borderBottom: "1px solid token(colors.neutral/10)", _last: { borderBottom: "0" } })}>
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

                            return (
                                <Table.Body.Root
                                    key={account.id}
                                    className={css({ borderY: "1px solid token(colors.neutral/10)", _last: { borderBottom: "0" } })}
                                >
                                    <Table.Body.Row className={css({ borderColor: "neutral/10", bg: "background" })}>
                                        <Table.Body.Cell className={css({ display: "flex", justifyContent: "start", alignItems: "start", gap: "2" })}>
                                            <FormatText className={css({ overflow: "visible" })}>
                                                {account.number}
                                            </FormatText>
                                            <FormatText wrap={true} className={css({ color: "neutral/50" })}>
                                                {account.label}
                                            </FormatText>
                                        </Table.Body.Cell>
                                        <Table.Body.Cell />
                                        <Table.Body.Cell className={css({ w: "[1%]" })} align="right">
                                            <FormatPrice price={accountTotalDebit} className={css({ fontWeight: "bold" })} />
                                        </Table.Body.Cell>
                                        <Table.Body.Cell className={css({ w: "[1%]" })} align="right">
                                            <FormatPrice price={accountTotalCredit} className={css({ fontWeight: "bold" })} />
                                        </Table.Body.Cell>
                                    </Table.Body.Row>
                                    <Fragment>
                                        {
                                            filteredRecordRows.map((recordRow) => {
                                                return (
                                                    <Table.Body.Row key={recordRow.id} className={css({ borderColor: "neutral/5" })}>
                                                        <Table.Body.Cell />
                                                        <Table.Body.Cell>
                                                            <FormatText wrap={true}>
                                                                {recordRow.label}
                                                            </FormatText>
                                                        </Table.Body.Cell>
                                                        <Table.Body.Cell className={css({ w: "[1%]" })} align="right">
                                                            <FormatPrice price={recordRow.debit} />
                                                        </Table.Body.Cell>
                                                        <Table.Body.Cell className={css({ w: "[1%]" })} align="right">
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
