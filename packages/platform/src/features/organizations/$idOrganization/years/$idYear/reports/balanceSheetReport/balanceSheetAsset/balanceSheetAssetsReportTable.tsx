import { FormatNull } from "#/components/formats/formatNull.js"
import { Table } from "#/components/layouts/table/table.js"
import { BalanceSheetAssetsReportItem } from "#/features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetAsset/balanceSheetAssetsReportItem.js"
import { BalanceSheetAssetsReportRow } from "#/features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetAsset/balanceSheetAssetsReportRow.js"
import { getBalanceSheetChildren } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/getBalanceSheetChildren.js"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"


export function BalanceSheetAssetsReportTable(props: {
    balanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
}) {

    let grossAmount = 0
    let amortizationAmount = 0
    props.accounts
        .filter((account) => account.idBalanceSheetAsset !== null)
        .forEach((account) => {
            props.recordRows
                .filter((recordRow) => recordRow.idAccount === account.id)
                .forEach((recordRow) => {
                    const debit = Number(recordRow.debit)
                    const credit = Number(recordRow.credit)

                    if (account.balanceSheetAssetColumn === "gross") {
                        grossAmount += (debit - credit)
                    }
                    if (account.balanceSheetAssetColumn === "amortization") {
                        amortizationAmount += (debit - credit)
                    }
                })
        })

    return (
        <Table.Root className="">
            <Table.Header.Root>
                <Table.Header.Row>
                    <Table.Header.Cell />
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm">Brut</span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm whitespace-nowrap">Amort. & Dépré.</span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm">Net</span>
                    </Table.Header.Cell>
                </Table.Header.Row>
            </Table.Header.Root>
            <Table.Body.Root>
                {
                    (props.balanceSheets.length === 0)
                        ? (
                            <Table.Body.Root className="border-b border-neutral/10 last:border-b-0">
                                <Table.Body.Row>
                                    <Table.Body.Cell>
                                        <FormatNull className="" />
                                    </Table.Body.Cell>
                                </Table.Body.Row>
                            </Table.Body.Root>
                        )
                        : (
                            <Fragment>
                                <BalanceSheetAssetsReportRow
                                    level={0}
                                    number={" "}
                                    label={"Total"}
                                    grossAmount={grossAmount}
                                    amortizationAmount={amortizationAmount}
                                    isAmountDisplayed={true}
                                />
                                {
                                    props.balanceSheets
                                        .filter((balanceSheet) => balanceSheet.idBalanceSheetParent === null)
                                        .sort((a, b) => Number(a.number) - Number(b.number))
                                        .map((balanceSheet) => {
                                            const balanceSheetChildren = getBalanceSheetChildren({
                                                balanceSheet: balanceSheet,
                                                balanceSheets: props.balanceSheets
                                            })

                                            return (
                                                <BalanceSheetAssetsReportItem
                                                    key={balanceSheet.id}
                                                    idOrganization={balanceSheet.idOrganization}
                                                    idYear={balanceSheet.idYear}
                                                    accounts={props.accounts}
                                                    recordRows={props.recordRows}
                                                    balanceSheet={balanceSheet}
                                                    balanceSheetChildren={balanceSheetChildren}
                                                    level={0}
                                                />
                                            )
                                        })
                                }
                            </Fragment>
                        )
                }
            </Table.Body.Root>
        </Table.Root>
    )
}
