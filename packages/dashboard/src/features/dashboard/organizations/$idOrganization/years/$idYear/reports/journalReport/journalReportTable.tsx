import { readOneAccountRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"
import { FormatDate } from "../../../../../../../../components/formats/formatDate.tsx"
import { FormatNull } from "../../../../../../../../components/formats/formatNull.tsx"
import { FormatPrice } from "../../../../../../../../components/formats/formatPrice.tsx"
import { FormatText } from "../../../../../../../../components/formats/formatText.tsx"
import { DataWrapper } from "../../../../../../../../components/layouts/dataWrapper.tsx"
import { Table } from "../../../../../../../../components/layouts/table/table.tsx"
import { compareAmounts } from "../../../../../../../../utilities/compareAmounts.ts"


export function JournalReportTable(props: {
    records: Array<v.InferOutput<typeof returnedSchemas.record>>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
}) {

    const recordRows = props.recordRows

    const totalDebit = recordRows.reduce((acc, recordRow) => acc + Number(recordRow.debit), 0)
    const totalCredit = recordRows.reduce((acc, recordRow) => acc + Number(recordRow.credit), 0)

    const sortedRecords = props.records
        .sort((a, b) => b.date.localeCompare(a.date))

    return (
        <Table.Root>
            <Table.Header.Root>
                <Table.Header.Row>
                    <Table.Header.Cell>
                        <span className={css({ color: "neutral/75", fontSize: "sm" })}>
                            Date
                        </span>
                    </Table.Header.Cell>
                    <Table.Header.Cell>
                        <span className={css({ color: "neutral/75", fontSize: "sm" })}>
                            Libellé
                        </span>
                    </Table.Header.Cell>
                    <Table.Header.Cell>
                        <span className={css({ color: "neutral/75", fontSize: "sm" })}>
                            Compte
                        </span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className={css({ w: "[1%]" })} align="right">
                        <span className={css({ color: "neutral/75", fontSize: "sm", whiteSpace: "nowrap" })}>
                            Débit
                        </span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className={css({ w: "[1%]" })} align="right">
                        <span className={css({ color: "neutral/75", fontSize: "sm", whiteSpace: "nowrap" })}>
                            Crédit
                        </span>
                    </Table.Header.Cell>
                </Table.Header.Row>
            </Table.Header.Root>
            <Table.Body.Root className={css({ borderY: "1px solid token(colors.neutral/10)", _last: { borderBottom: "0" } })}>
                <Table.Body.Row>
                    <Table.Body.Cell colSpan={2} />
                    <Table.Body.Cell align="right">
                        <span className={css({ color: "neutral/50" })}>
                            Total
                        </span>
                    </Table.Body.Cell>
                    <Table.Body.Cell className={css({ w: "[1%]" })} align="right">
                        <FormatPrice
                            price={totalDebit}
                            className={css({ fontWeight: "bold" })}
                        />
                    </Table.Body.Cell>
                    <Table.Body.Cell className={css({ w: "[1%]" })} align="right">
                        <FormatPrice
                            price={totalCredit}
                            className={css({ fontWeight: "bold" })}
                        />
                    </Table.Body.Cell>
                </Table.Body.Row>
            </Table.Body.Root>
            <Fragment>
                {
                    (sortedRecords.length === 0)
                        ? (
                            <Table.Body.Root className={css({ borderBottom: "1px solid token(colors.neutral/10)", _last: { borderBottom: "0" } })}>
                                <Table.Body.Row>
                                    <Table.Body.Cell>
                                        <FormatNull />
                                    </Table.Body.Cell>
                                </Table.Body.Row>
                            </Table.Body.Root>
                        )
                        : sortedRecords.map((record) => {

                            const sortedRecordRows = recordRows
                                .filter((recordRow) => recordRow.idRecord === record.id)
                                .sort((a, b) => (a.lastUpdatedAt ?? "").localeCompare(b.lastUpdatedAt ?? ""))

                            const recordTotalDebit = sortedRecordRows.reduce((acc, recordRow) => acc + Number(recordRow.debit), 0)
                            const recordTotalCredit = sortedRecordRows.reduce((acc, recordRow) => acc + Number(recordRow.credit), 0)

                            return (
                                <Table.Body.Root key={record.id} className={css({ borderY: "1px solid token(colors.neutral/10)", _last: { borderBottom: "0" } })}>
                                    <Table.Body.Row className={cx(
                                        css({ borderColor: "neutral/10", bg: "background" }),
                                        // (recordTotalDebit === recordTotalCredit) ? "" : "border border-error"
                                    )}>
                                        <Table.Body.Cell>
                                            <FormatDate
                                                className={css({ fontStyle: "italic" })}
                                                date={record.date}
                                            />
                                        </Table.Body.Cell>
                                        <Table.Body.Cell colSpan={2}>
                                            <FormatText wrap={true}>
                                                {record.label}
                                            </FormatText>
                                        </Table.Body.Cell>
                                        {/* <Table.Body.Cell colSpan={2} /> */}
                                        <Table.Body.Cell className={css({ w: "[1%]" })} align="right">
                                            <FormatPrice
                                                price={recordTotalDebit}
                                                className={cx(
                                                    css({ fontWeight: "bold" }),
                                                    (compareAmounts({ a: recordTotalDebit, b: recordTotalCredit })) ? "" : css({ color: "error" })
                                                )}
                                            />
                                        </Table.Body.Cell>
                                        <Table.Body.Cell className={css({ w: "[1%]" })} align="right">
                                            <FormatPrice
                                                price={recordTotalCredit}
                                                className={cx(
                                                    css({ fontWeight: "bold" }),
                                                    (compareAmounts({ a: recordTotalDebit, b: recordTotalCredit })) ? css({ color: "neutral" }) : css({ color: "error" })
                                                )}
                                            />
                                        </Table.Body.Cell>
                                    </Table.Body.Row>
                                    <Fragment>
                                        {
                                            sortedRecordRows.map((recordRow) => {
                                                return (
                                                    <Table.Body.Row key={recordRow.id}>
                                                        <Table.Body.Cell>

                                                        </Table.Body.Cell>
                                                        <Table.Body.Cell>
                                                            <FormatText wrap={true}>
                                                                {recordRow.label}
                                                            </FormatText>
                                                        </Table.Body.Cell>
                                                        <Table.Body.Cell className={css({ display: "flex", justifyContent: "start", alignItems: "start", gap: "2" })}>
                                                            <DataWrapper
                                                                routeDefinition={readOneAccountRouteDefinition}
                                                                body={{
                                                                    idOrganization: recordRow.idOrganization,
                                                                    idYear: recordRow.idYear,
                                                                    idAccount: recordRow.idAccount
                                                                }}
                                                            >
                                                                {(account) => (
                                                                    <Fragment>
                                                                        <FormatText className={css({ overflow: "visible" })}>
                                                                            {account.number}
                                                                        </FormatText>
                                                                        <FormatText wrap={true} className={css({ color: "neutral/50" })}>
                                                                            {account.label}
                                                                        </FormatText>
                                                                    </Fragment>
                                                                )}
                                                            </DataWrapper>
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
