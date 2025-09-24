import { BalanceSheetLiability } from "#src/utilities/email/templates/balanceSheet/groupBalanceSheetsLiabilities.js"
import { PriceFormat } from "#src/utilities/email/templates/components/price/priceFormat.js"
import { Table } from "#src/utilities/email/templates/components/table/table.js"
import { numberToRomanString } from "#src/utilities/numberToRomanString.js"
import { css, cx } from "hono/css"
import { Fragment } from "hono/jsx/jsx-runtime"


export function BalanceSheetLiabilityBody(props: {
    balanceSheets: Array<BalanceSheetLiability>
    increment: number
    displayNumber?: boolean
}) {
    return (
        <Fragment>
            {
                props.balanceSheets.map((entry) => {
                    const label = !props.displayNumber ? entry.label : `${numberToRomanString(Number(entry.number))} ${entry.label}`
                    return (
                        <Fragment key={entry.id}>
                            <Table.Body.Row>
                                <Table.Body.Cell style={{ paddingLeft: `${props.increment * 16 + 8}px` }} >
                                    <span
                                        class={cx(
                                            css`white-space: normal;`,
                                            props.displayNumber ? css`font-weight: bold;` : undefined
                                        )}
                                    >
                                        {label}
                                    </span>
                                </Table.Body.Cell>
                                {
                                    entry.balanceSheets.length > 0 ? (
                                        <Table.Body.Cell colSpan={3} />
                                    ) : (
                                        <Table.Body.Cell align="right">
                                            <PriceFormat price={entry.net} />
                                        </Table.Body.Cell>
                                    )
                                }
                            </Table.Body.Row>
                            <BalanceSheetLiabilityBody balanceSheets={entry.balanceSheets} increment={props.increment + 1} />
                        </Fragment>
                    )
                })
            }
        </Fragment>
    )
}
