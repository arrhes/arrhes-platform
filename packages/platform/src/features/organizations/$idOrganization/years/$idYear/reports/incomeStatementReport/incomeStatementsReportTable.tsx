import { FormatNull } from "#/components/formats/formatNull.js"
import { FormatPrice } from "#/components/formats/formatPrice.js"
import { FormatText } from "#/components/formats/formatText.js"
import { Table } from "#/components/layouts/table/table.js"
import { IncomeStatementReportBody } from "#/features/organizations/$idOrganization/years/$idYear/reports/incomeStatementReport/incomeStatementReportBody.js"
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
                <IncomeStatementReportBody
                    incomeStatements={props.incomeStatements}
                    incomeStatementParent={null}
                    displayNumber={true}
                    increment={0}
                />
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
                            const computationStatements = props.computationIncomeStatements
                                .map((computationIncomeStatement) => ({
                                    ...computationIncomeStatement,
                                    incomeStatement: props.incomeStatements.find((incomeStatement) => incomeStatement.id === computationIncomeStatement.idIncomeStatement)
                                }))
                            // .sort((a, b) => {
                            //     if (!a.incomeStatement || !b.incomeStatement) return 0
                            //     return (a.incomeStatement.number - b.incomeStatement.number)
                            // })

                            const sum = computationStatements.reduce((sum, computationStatement) => {
                                if (!computationStatement.incomeStatement) return sum
                                if (computationStatement.operation === "plus") sum += Number(computationStatement.incomeStatement.netAmountAdded)
                                if (computationStatement.operation === "minus") sum += -Number(computationStatement.incomeStatement.netAmountAdded)
                                return sum
                            }, 0)
                            const statementsLabel = computationStatements.map((computationStatement, computationStatementIndex) => {
                                if (!computationStatement.incomeStatement) return ""
                                const romanNumber = toRoman(Number(computationStatement.incomeStatement.number))
                                if (computationStatement.operation === "plus") {
                                    if (computationStatementIndex === 0) return `${romanNumber}`
                                    return `+${romanNumber}`
                                }
                                if (computationStatement.operation === "minus") return `-${romanNumber}`
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
                                        <FormatPrice price={sum} />
                                    </Table.Body.Cell>
                                </Table.Body.Row>
                            )
                        })
                }
            </Table.Body.Root>
        </Table.Root>
    )
}
