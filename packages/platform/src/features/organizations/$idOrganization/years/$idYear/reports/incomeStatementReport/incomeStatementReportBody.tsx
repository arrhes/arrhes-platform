import { FormatPrice } from "#/components/formats/formatPrice.js"
import { FormatText } from "#/components/formats/formatText.js"
import { Table } from "#/components/layouts/table/table.js"
import { cn } from "#/utilities/cn.js"
import { toRoman } from "#/utilities/toRoman.js"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"


export function IncomeStatementReportBody(props: {
    incomeStatements: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
    incomeStatementParent: v.InferOutput<typeof returnedSchemas.incomeStatement> | null
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
    increment: number
    displayNumber: boolean
}) {
    const filteredIncomeStatements = props.incomeStatements
        .filter((incomeStatement) => {
            const hasParent = incomeStatement.idIncomeStatementParent === (props.incomeStatementParent?.id ?? null)
            return hasParent
        })

    return (
        <Fragment>
            {
                filteredIncomeStatements.map((incomeStatement) => {
                    const label = (props.displayNumber === false)
                        ? incomeStatement.label
                        : `${toRoman(Number(incomeStatement.number))} ${incomeStatement.label}`

                    const accounts = props.accounts.filter((account) => {
                        console.log(account.idIncomeStatement)
                        return account.idIncomeStatement === incomeStatement.id
                    })
                    console.log(accounts)

                    const recordRows = props.recordRows.filter((recordRow) => {
                        return accounts.find((account) => account.id === recordRow.idAccount) !== undefined
                    })

                    const total = recordRows.reduce((acc, recordRow) => acc + Number(recordRow.debit) - Number(recordRow.credit), 0)

                    return (
                        <Fragment key={incomeStatement.id}>
                            <Table.Body.Row
                                className={cn(
                                    "",
                                    props.displayNumber ? "bg-neutral/5" : ""
                                )}
                            >
                                <Table.Body.Cell style={{ paddingLeft: `${props.increment * 16 + 8}px` }} >
                                    <FormatText
                                        className={cn(
                                            "whitespace-normal",
                                            props.displayNumber ? "font-bold" : ""
                                        )}
                                    >
                                        {label}
                                    </FormatText>
                                </Table.Body.Cell>
                                {
                                    (filteredIncomeStatements.length === 0)
                                        ? (
                                            <Table.Body.Cell />
                                        )
                                        : (
                                            <Table.Body.Cell className="w-[1%]" align="right">
                                                <FormatPrice price={total} />
                                            </Table.Body.Cell>
                                        )
                                }
                            </Table.Body.Row>
                            <IncomeStatementReportBody
                                incomeStatements={props.incomeStatements}
                                incomeStatementParent={incomeStatement}
                                recordRows={props.recordRows}
                                accounts={props.accounts}
                                increment={props.increment + 1}
                                displayNumber={false}
                            />
                        </Fragment>
                    )
                })
            }
        </Fragment>
    )
}
