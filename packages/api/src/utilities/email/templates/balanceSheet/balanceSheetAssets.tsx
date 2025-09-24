import { BalanceSheetAssetBody } from "#src/utilities/email/templates/balanceSheet/balanceSheetAssetBody.js"
import { BalanceSheetAsset } from "#src/utilities/email/templates/balanceSheet/groupBalanceSheetsAssets.js"
import { PriceFormat } from "#src/utilities/email/templates/components/price/priceFormat.js"
import { Table } from "#src/utilities/email/templates/components/table/table.js"
import { Style, css } from "hono/css"


export function BalanceSheetAssets(props: {
    balanceSheets: Array<BalanceSheetAsset>
}) {
    const totalGrossBalanceSheetAssets = props.balanceSheets.reduce<number>((previous, entry) => previous + Number(entry.gross), 0)
    const totalAllowanceBalanceSheetAssets = props.balanceSheets.reduce<number>((previous, entry) => previous + Number(entry.allowance), 0)
    return (
        <>
            <Style />
            <Table.Root>
                <Table.Header.Root>
                    <Table.Header.Row>
                        <Table.Header.Cell>
                            <span class={css`color: #333333;`}>
                                ACTIF
                            </span>
                        </Table.Header.Cell>
                        <Table.Header.Cell align="right">
                            <span class={css`color: #333333;`}>
                                Brut
                            </span>
                        </Table.Header.Cell>
                        <Table.Header.Cell align="right">
                            <span class={css`color: #333333; font-size: 0.75rem;`}>
                                Amortissements & dépréciations
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
                            <BalanceSheetAssetBody
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
                            <PriceFormat price={totalGrossBalanceSheetAssets} />
                        </Table.Body.Cell>
                        <Table.Body.Cell align="right" class={css`border-top: 1px solid #111111; border-bottom: 0px;`}>
                            <PriceFormat price={totalAllowanceBalanceSheetAssets} />
                        </Table.Body.Cell>
                        <Table.Body.Cell align="right" class={css`border-top: 1px solid #111111; border-bottom: 0px;`}>
                            <PriceFormat price={totalGrossBalanceSheetAssets + totalAllowanceBalanceSheetAssets} />
                        </Table.Body.Cell>
                    </Table.Body.Row>
                </Table.Body.Root>
            </Table.Root>
        </>
    )
}
