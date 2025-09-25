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
    increment: number
    displayNumber: boolean
}) {
    const filteredIncomeStatements = props.incomeStatements
        .filter((incomeStatement) => incomeStatement.idIncomeStatementParent === props.incomeStatementParent?.id)

    return (
        <Fragment>
            {
                filteredIncomeStatements.map((incomeStatement) => {
                    const label = (props.displayNumber === false)
                        ? incomeStatement.label
                        : `${toRoman(Number(incomeStatement.number))} ${incomeStatement.label}`

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
                                            <Table.Body.Cell className="w-[1%]" align="right">
                                                <FormatPrice price={incomeStatement.netAmountAdded} />
                                            </Table.Body.Cell>
                                        )
                                        : (
                                            <Table.Body.Cell />
                                        )
                                }
                            </Table.Body.Row>
                            <IncomeStatementReportBody
                                incomeStatements={props.incomeStatements}
                                incomeStatementParent={incomeStatement}
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
