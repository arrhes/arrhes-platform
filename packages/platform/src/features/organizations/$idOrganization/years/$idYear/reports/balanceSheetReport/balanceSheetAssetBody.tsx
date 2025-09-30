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
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
    increment: number
    displayNumber: boolean
}) {
    const filteredBalanceSheets = props.balanceSheets
        .filter((balanceSheet) => {
            const isAssetSide = balanceSheet.side === "asset"
            const hasParent = balanceSheet.idBalanceSheetParent === (props.balanceSheetParent?.id ?? null)
            return isAssetSide && hasParent
        })

    return (
        <Fragment>
            {
                filteredBalanceSheets.map((balanceSheet) => {
                    const label = (props.displayNumber === false)
                        ? balanceSheet.label
                        : `${toRoman(Number(balanceSheet.number))} ${balanceSheet.label}`

                    let grossAmount = 0
                    let amortizationAmount = 0
                    props.accounts
                        .filter((account) => {
                            const isBalanceSheet = (account.idBalanceSheet === balanceSheet.id)
                            return isBalanceSheet
                        })
                        .forEach((account) => {
                            props.recordRows
                                .filter((recordRow) => recordRow.idAccount === account.id)
                                .forEach((recordRow) => {
                                    if (account.balanceSheetColumn === "gross") {
                                        if (account.balanceSheetFlow === null) { return }
                                        grossAmount += Number(recordRow[account.balanceSheetFlow])
                                    }
                                    if (account.balanceSheetColumn === "amortization") {
                                        if (account.balanceSheetFlow === null) { return }
                                        amortizationAmount += Number(recordRow[account.balanceSheetFlow])
                                    }
                                })
                        })

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
                                            <Table.Body.Cell colSpan={3} />
                                        )
                                        : (
                                            <Fragment>
                                                <Table.Body.Cell className="w-[1%]" align="right">
                                                    <FormatPrice price={grossAmount} />
                                                </Table.Body.Cell>
                                                <Table.Body.Cell className="w-[1%]" align="right">
                                                    <FormatPrice price={amortizationAmount} />
                                                </Table.Body.Cell>
                                                <Table.Body.Cell className="w-[1%]" align="right">
                                                    <FormatPrice price={grossAmount - amortizationAmount} />
                                                </Table.Body.Cell>
                                            </Fragment>
                                        )
                                }
                            </Table.Body.Row>
                            <BalanceSheetAssetBody
                                balanceSheets={props.balanceSheets}
                                balanceSheetParent={balanceSheet}
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
