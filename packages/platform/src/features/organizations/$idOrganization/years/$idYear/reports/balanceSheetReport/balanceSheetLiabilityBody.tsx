import { returnedSchemas } from "@arrhes/schemas/schemas"
import { FormatPrice } from "components/formats/formatPrice"
import { FormatText } from "components/formats/formatText"
import { Table } from "components/layouts/table/table"
import { Fragment } from "react"
import { cn } from "utilities/cn"
import { toRoman } from "utilities/toRoman"
import * as v from "valibot"



export function BalanceSheetLiabilityBody(props: {
    balanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
    balanceSheetParent: v.InferOutput<typeof returnedSchemas.balanceSheet> | null
    increment: number
    displayNumber?: boolean
}) {
    const filteredBalanceSheets = props.balanceSheets
        .filter((balanceSheet) => balanceSheet.idBalanceSheetParent === props.balanceSheetParent?.id)

    return (
        <Fragment>
            {
                filteredBalanceSheets.map((balanceSheet) => {
                    const label = (props.displayNumber === false)
                        ? balanceSheet.label
                        : `${toRoman(Number(balanceSheet.number))} ${balanceSheet.label}`

                    return (
                        <Fragment key={balanceSheet.id}>
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
                                    (filteredBalanceSheets.length === 0) ? (
                                        <Table.Body.Cell colSpan={3} />
                                    ) : (
                                        <Table.Body.Cell className="w-[1%]" align="right">
                                            <FormatPrice price={balanceSheet.netAmountAdded} />
                                        </Table.Body.Cell>
                                    )
                                }
                            </Table.Body.Row>
                            <BalanceSheetLiabilityBody
                                balanceSheets={props.balanceSheets}
                                balanceSheetParent={balanceSheet}
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
