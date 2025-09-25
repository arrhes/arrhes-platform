import { FormatPrice } from "#/components/formats/formatPrice.js"
import { FormatText } from "#/components/formats/formatText.js"
import { Table } from "#/components/layouts/table/table.js"
import { cn } from "#/utilities/cn.js"
import { toRoman } from "#/utilities/toRoman.js"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"


export function BalanceSheetAssetBody(props: {
    balanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
    balanceSheetParent: v.InferOutput<typeof returnedSchemas.balanceSheet> | null
    increment: number
    displayNumber: boolean
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
                                    (filteredBalanceSheets.length === 0)
                                        ? (
                                            <Fragment>
                                                <Table.Body.Cell className="w-[1%]" align="right">
                                                    <FormatPrice price={balanceSheet.grossAmountAdded} />
                                                </Table.Body.Cell>
                                                <Table.Body.Cell className="w-[1%]" align="right">
                                                    <FormatPrice price={balanceSheet.amortizationAmountAdded} />
                                                </Table.Body.Cell>
                                                <Table.Body.Cell className="w-[1%]" align="right">
                                                    <FormatPrice price={balanceSheet.netAmountAdded} />
                                                </Table.Body.Cell>
                                            </Fragment>
                                        )
                                        : (
                                            <Table.Body.Cell colSpan={3} />
                                        )
                                }
                            </Table.Body.Row>
                            <BalanceSheetAssetBody
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
