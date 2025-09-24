import { PriceFormat } from "#/utilities/email/templates/components/price/priceFormat.js"
import { Table } from "#/utilities/email/templates/components/table/table.js"
import { IncomeStatementItem } from "#/utilities/email/templates/incomeStatement/groupIncomeStatements.js"
import { IncomeStatementBody } from "#/utilities/email/templates/incomeStatement/incomeStatementBody.js"
import { numberToRomanString } from "#/utilities/numberToRomanString.js"
import { schemas } from "@arrhes/metadata/schemas"
import { css } from "hono/css"
import { Fragment } from "hono/jsx/jsx-runtime"
import * as v from "valibot"


export function IncomeStatementTable(props: {
    incomeStatements: Array<IncomeStatementItem>
    computations: Array<
        & v.InferOutput<typeof schemas.computation>
        & {
            computationIncomeStatements: Array<v.InferOutput<typeof schemas.computationIncomeStatement>>
        }
    >
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
                <IncomeStatementBody
                    incomeStatements={props.incomeStatements}
                    displayNumber={true}
                    increment={0}
                />
                {
                    props.computations.length > 0 ? (
                        <Fragment>
                            {props.computations.map((computation, index) => {
                                const computationIncomeStatements = (computation.computationIncomeStatements)
                                    .map((computationIncomeStatement) => ({
                                        ...computationIncomeStatement,
                                        incomeStatement: props.incomeStatements.find((_incomeStatement) => _incomeStatement.id === computationIncomeStatement.idIncomeStatement)
                                    }))
                                    .sort((a, b) => {
                                        if (!a.incomeStatement || !b.incomeStatement) return 0
                                        return (a.incomeStatement.number.localeCompare(b.incomeStatement.number))
                                    })

                                const sum = computationIncomeStatements.reduce((sum, computationIncomeStatement) => {
                                    if (!computationIncomeStatement.incomeStatement) return sum
                                    if (computationIncomeStatement.operation === "plus") sum += computationIncomeStatement.incomeStatement.net
                                    if (computationIncomeStatement.operation === "minus") sum += -computationIncomeStatement.incomeStatement.net
                                    return sum
                                }, 0)
                                const incomeStatementsLabel = computationIncomeStatements.map((computationIncomeStatement, computationIncomeStatementIndex) => {
                                    if (!computationIncomeStatement.incomeStatement) return ""
                                    const romanNumber = numberToRomanString(Number(computationIncomeStatement.incomeStatement.number))
                                    if (computationIncomeStatement.operation === "plus") {
                                        if (computationIncomeStatementIndex === 0) return `${romanNumber}`
                                        return `+${romanNumber}`
                                    }
                                    if (computationIncomeStatement.operation === "minus") return `-${romanNumber}`
                                    return 0
                                }).join("")

                                return (
                                    <Table.Body.Row>
                                        <Table.Body.Cell align="right" class={css`border-top: 1px solid #111111; border-bottom: 0px;`}>
                                            <span class={css`color: #333333; text-align: right;`}>
                                                {computation.label}
                                            </span>
                                            <span class={css`font-size: 0.75rem; text-align: right; margin-left: 0.5rem;`}>
                                                ({incomeStatementsLabel})
                                            </span>
                                        </Table.Body.Cell>
                                        <Table.Body.Cell align="right" class={css`border-top: 1px solid #111111; border-bottom: 0px;`}>
                                            <PriceFormat price={sum} />
                                        </Table.Body.Cell>
                                    </Table.Body.Row>
                                )
                            })}
                        </Fragment>
                    ) : (
                        <Table.Body.Row>
                            <Table.Body.Cell>
                                <span class={css`color: #333333;`}>
                                    /
                                </span>
                            </Table.Body.Cell>
                        </Table.Body.Row>
                    )
                }
            </Table.Body.Root>
        </Table.Root>
    )
}