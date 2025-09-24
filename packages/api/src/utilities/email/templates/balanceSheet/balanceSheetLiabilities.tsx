import { BalanceSheetLiabilityBody } from "#src/utilities/email/templates/balanceSheet/balanceSheetLiabilityBody.js"
import { BalanceSheetLiability } from "#src/utilities/email/templates/balanceSheet/groupBalanceSheetsLiabilities.js"
import { PriceFormat } from "#src/utilities/email/templates/components/price/priceFormat.js"
import { Table } from "#src/utilities/email/templates/components/table/table.js"
import { css } from "hono/css"


export function BalanceSheetLiabilities(props: {
    balanceSheets: Array<BalanceSheetLiability>
}) {
    const totalNetBalanceSheetLiabilities = props.balanceSheets.reduce<number>((previous, entry) => previous + Number(entry.net), 0)
    return (
        <Table.Root class={css`margin-top: 32px;`}>
            <Table.Header.Root>
                <Table.Header.Row>
                    <Table.Header.Cell>
                        <span class={css`color: #333333;`}>
                            PASSIF
                        </span>
                    </Table.Header.Cell>
                    <Table.Header.Cell align="right">
                        <span class={css`color: #333333;`}>
                            Net
                        </span>
                    </Table.Header.Cell>
                </Table.Header.Row>
            </Table.Header.Root>
            <Table.Body.Root>
                {
                    props.balanceSheets.length > 0 ? (
                        <BalanceSheetLiabilityBody
                            balanceSheets={props.balanceSheets}
                            displayNumber={true}
                            increment={0}
                        />
                    )
                        : (
                            <Table.Body.Row>
                                <Table.Body.Cell>
                                    <span class={css`color: #333333;`}>
                                        /
                                    </span>
                                </Table.Body.Cell>
                            </Table.Body.Row>
                        )
                }
                <Table.Body.Row>
                    <Table.Body.Cell align="right" class={css`border-top: 1px solid #111111; border-bottom: 0px;`}>
                        <span class={css`white-space: normal; font-weight: bold;`}>
                            Total
                        </span>
                    </Table.Body.Cell>
                    <Table.Body.Cell align="right" class={css`border-top: 1px solid #111111; border-bottom: 0px;`}>
                        <PriceFormat price={totalNetBalanceSheetLiabilities} />
                    </Table.Body.Cell>
                </Table.Body.Row>
            </Table.Body.Root>
        </Table.Root>
    )
}
