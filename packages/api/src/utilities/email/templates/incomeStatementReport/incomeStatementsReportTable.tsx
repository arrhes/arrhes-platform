import { PriceFormat } from "#/utilities/email/templates/components/price/priceFormat.js"
import { Table } from "#/utilities/email/templates/components/table/table.js"
import { getIncomeStatementChildren } from "#/utilities/email/templates/incomeStatementReport/getIncomeStatementChildren.js"
import { IncomeStatementReportItem } from "#/utilities/email/templates/incomeStatementReport/incomeStatementReportItem.js"
import { numberToRomanString } from "#/utilities/numberToRomanString.js"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { css } from "hono/css"
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
                    <Table.Header.Cell align="right">
                        <span class={css`color: #333333;`}>
                            Net
                        </span>
                    </Table.Header.Cell>
                </Table.Header.Row>
            </Table.Header.Root>
            <Table.Body.Root>
                {
                    props.incomeStatements
                        .filter((incomeStatement) => incomeStatement.idIncomeStatementParent === null)
                        .sort((a, b) => Number(a.number) - Number(b.number))
                        .map((incomeStatement) => {
                            const incomeStatementChildren = getIncomeStatementChildren({
                                incomeStatement: incomeStatement,
                                incomeStatements: props.incomeStatements
                            })

                            return (
                                <IncomeStatementReportItem
                                    key={incomeStatement.id}
                                    accounts={props.accounts}
                                    recordRows={props.recordRows}
                                    incomeStatement={incomeStatement}
                                    incomeStatementChildren={incomeStatementChildren}
                                    level={0}
                                />
                            )
                        })
                }
            </Table.Body.Root>
            <Table.Body.Root>
                {
                    props.computations.map((computation, index) => {

                        let computationAmount = 0
                        const computationStatements = props.computationIncomeStatements
                            .filter((computationIncomeStatement) => computationIncomeStatement.idComputation === computation.id)
                            .forEach((computationIncomeStatement) => {
                                let incomeStatementAmount = 0
                                props.accounts
                                    .filter((account) => {
                                        const foundIncomeStatement = props.incomeStatements.find((incomeStatement) => incomeStatement.id === computationIncomeStatement.idIncomeStatement)
                                        if (foundIncomeStatement === undefined) {
                                            return false
                                        }
                                        const incomeStatementChildren = getIncomeStatementChildren({
                                            incomeStatement: foundIncomeStatement,
                                            incomeStatements: props.incomeStatements
                                        })

                                        const hasAccount = account.idIncomeStatement === computationIncomeStatement.idIncomeStatement
                                        const hasChildrenAccount = incomeStatementChildren.some((incomeStatement) => incomeStatement.id === account.idIncomeStatement)
                                        return hasAccount || hasChildrenAccount
                                    })
                                    .forEach((account) => {
                                        props.recordRows
                                            .filter((recordRow) => recordRow.idAccount === account.id)
                                            .forEach((recordRow) => {
                                                incomeStatementAmount += Number(recordRow.debit) - Number(recordRow.credit)
                                            })
                                    })

                                if (computationIncomeStatement.operation === "plus") {
                                    computationAmount += Math.abs(incomeStatementAmount)
                                }
                                if (computationIncomeStatement.operation === "minus") {
                                    computationAmount += -Math.abs(incomeStatementAmount)
                                }
                            })

                        // .sort((a, b) => {
                        //     if (!a.incomeStatement || !b.incomeStatement) return 0
                        //     return (a.incomeStatement.number - b.incomeStatement.number)
                        // })


                        const computationIncomeStatementsLabel = props.computationIncomeStatements
                            .filter((computationIncomeStatement) => computationIncomeStatement.idComputation === computation.id)
                            .map((computationIncomeStatement, computationIncomeStatementIndex) => {
                                const incomeStatement = props.incomeStatements.find((incomeStatement) => incomeStatement.id === computationIncomeStatement.idIncomeStatement)
                                if (incomeStatement === undefined) return ""
                                const romanNumber = numberToRomanString(Number(incomeStatement.number))
                                if (computationIncomeStatement.operation === "plus") {
                                    if (computationIncomeStatementIndex === 0) return `${romanNumber}`
                                    return `+${romanNumber}`
                                }
                                if (computationIncomeStatement.operation === "minus") return `-${romanNumber}`
                                return 0
                            }).join("")

                        return (
                            <Table.Body.Row>
                                <Table.Body.Cell align="right">
                                    <span
                                        class={css`white-space: normal; font-weight: bold;`}
                                    >
                                        {`${computation.label} (${computationIncomeStatementsLabel})`}
                                    </span>
                                </Table.Body.Cell>
                                <Table.Body.Cell align="right">
                                    <PriceFormat price={computationAmount} />
                                </Table.Body.Cell>
                            </Table.Body.Row>
                        )
                    })
                }
            </Table.Body.Root>
        </Table.Root>
    )
}
