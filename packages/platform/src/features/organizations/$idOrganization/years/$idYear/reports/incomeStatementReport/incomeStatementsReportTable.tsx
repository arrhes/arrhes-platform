import { FormatNull } from "#/components/formats/formatNull.js"
import { FormatPrice } from "#/components/formats/formatPrice.js"
import { FormatText } from "#/components/formats/formatText.js"
import { Table } from "#/components/layouts/table/table.js"
import { IncomeStatementReportRow } from "#/features/organizations/$idOrganization/years/$idYear/reports/incomeStatementReport/incomeStatementReportRow.js"
import { getIncomeStatementChildren } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/getIncomeStatementChildren.js"
import { getIncomeStatementLevel } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/getIncomeStatementLevel.js"
import { cn } from "#/utilities/cn.js"
import { toRoman } from "#/utilities/toRoman.js"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import * as v from "valibot"


export function IncomeStatementsReportTable(props: {
    incomeStatements: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
    computations: Array<v.InferOutput<typeof returnedSchemas.computation>>
    computationIncomeStatements: Array<v.InferOutput<typeof returnedSchemas.computationIncomeStatement>>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
}) {
    return (
        <Table.Root>
            <Table.Header.Root>
                <Table.Header.Row>
                    <Table.Header.Cell />
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm">
                            Net
                        </span>
                    </Table.Header.Cell>
                </Table.Header.Row>
            </Table.Header.Root>
            <Table.Body.Root>
                {
                    props.incomeStatements
                        .sort((a, b) => a.number.toString().localeCompare(b.number.toString()))
                        .map((incomeStatement) => {
                            const level = getIncomeStatementLevel({
                                incomeStatement: incomeStatement,
                                incomeStatements: props.incomeStatements
                            })

                            const number = (incomeStatement.number.length === 1)
                                ? toRoman(Number(incomeStatement.number))
                                : null

                            const label = incomeStatement.label

                            let amount = 0
                            const incomeStatementChildren = getIncomeStatementChildren({
                                incomeStatement: incomeStatement,
                                incomeStatements: props.incomeStatements
                            })
                            console.log(incomeStatementChildren)
                            props.accounts
                                .filter((account) => {
                                    return incomeStatementChildren.some((incomeStatementChild) => account.idIncomeStatement === incomeStatementChild.id)
                                })
                                .forEach((account) => {
                                    props.recordRows
                                        .filter((recordRow) => account.id === recordRow.idAccount)
                                        .forEach((recordRow) => {
                                            amount += Math.abs(Number(recordRow.debit) - Number(recordRow.credit))
                                        })
                                })

                            return (
                                <IncomeStatementReportRow
                                    key={incomeStatement.id}
                                    level={level}
                                    number={number}
                                    label={label}
                                    amount={amount}
                                />
                            )
                        })
                }
            </Table.Body.Root>
            <Table.Body.Root>
                {
                    (props.computations.length === 0)
                        ? (
                            <Table.Body.Root className="border-b border-neutral/10 last:border-b-0">
                                <Table.Body.Row>
                                    <Table.Body.Cell>
                                        <FormatNull className="" />
                                    </Table.Body.Cell>
                                </Table.Body.Row>
                            </Table.Body.Root>
                        )
                        : props.computations.map((computation, index) => {

                            let computationAmount = 0
                            const computationStatements = props.computationIncomeStatements
                                .filter((computationIncomeStatement) => computationIncomeStatement.idComputation === computation.id)
                                .forEach((computationIncomeStatement) => {
                                    let incomeStatementAmount = 0
                                    props.accounts
                                        .filter((account) => account.idIncomeStatement === computationIncomeStatement.idIncomeStatement)
                                        .forEach((account) => {
                                            props.recordRows
                                                .filter((recordRow) => account.id === recordRow.idAccount)
                                                .forEach((recordRow) => {
                                                    incomeStatementAmount += Math.abs(Number(recordRow.debit) - Number(recordRow.credit))
                                                })
                                        })

                                    if (computationIncomeStatement.operation === "plus") {
                                        computationAmount += incomeStatementAmount
                                    }
                                    if (computationIncomeStatement.operation === "minus") {
                                        computationAmount += -incomeStatementAmount
                                    }
                                })

                            // .sort((a, b) => {
                            //     if (!a.incomeStatement || !b.incomeStatement) return 0
                            //     return (a.incomeStatement.number - b.incomeStatement.number)
                            // })


                            const statementsLabel = props.computationIncomeStatements
                                .filter((computationIncomeStatement) => computationIncomeStatement.idComputation === computation.id)
                                .map((computationIncomeStatement, computationIncomeStatementIndex) => {
                                    const incomeStatement = props.incomeStatements.find((incomeStatement) => incomeStatement.id === computationIncomeStatement.idIncomeStatement)
                                    if (incomeStatement === undefined) return ""
                                    const romanNumber = toRoman(Number(incomeStatement.number))
                                    if (computationIncomeStatement.operation === "plus") {
                                        if (computationIncomeStatementIndex === 0) return `${romanNumber}`
                                        return `+${romanNumber}`
                                    }
                                    if (computationIncomeStatement.operation === "minus") return `-${romanNumber}`
                                    return 0
                                }).join("")

                            return (
                                <Table.Body.Row
                                    key={computation.id}
                                    className={cn(
                                        "",
                                        index === 0 ? "border-t border-neutral/25 border-b-neutral/5" : ""
                                    )}
                                >
                                    <Table.Body.Cell align="right" className="w-full flex justify-end gap-2">
                                        <FormatText
                                            className={"whitespace-normal text-right"}
                                        >
                                            {computation.label}
                                        </FormatText>
                                        <FormatText
                                            className={"whitespace-normal text-right text-neutral/50"}
                                        >
                                            {`(${statementsLabel})`}
                                        </FormatText>
                                    </Table.Body.Cell>
                                    <Table.Body.Cell className="w-[1%]" align="right">
                                        <FormatPrice price={computationAmount} />
                                    </Table.Body.Cell>
                                </Table.Body.Row>
                            )
                        })
                }
            </Table.Body.Root>
        </Table.Root>
    )
}
