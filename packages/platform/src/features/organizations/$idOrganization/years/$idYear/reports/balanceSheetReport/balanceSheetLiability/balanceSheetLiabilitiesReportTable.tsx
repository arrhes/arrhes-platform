import { FormatNull } from "#/components/formats/formatNull.js"
import { Table } from "#/components/layouts/table/table.js"
import { BalanceSheetLiabilitiesReportItem } from "#/features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetLiability/balanceSheetLiabilitiesReportItem.js"
import { BalanceSheetLiabilitiesReportRow } from "#/features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetLiability/balanceSheetLiabilityiesReportRow.js"
import { getBalanceSheetChildren } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/getBalanceSheetChildren.js"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"


export function BalanceSheetLiabilitiesReportTable(props: {
    balanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
}) {

    let netTotalAmount = 0
    props.accounts.forEach((account) => {
        let accountTotalDebit = 0
        let accountTotalCredit = 0

        props.recordRows
            .filter((recordRow) => recordRow.idAccount === account.id)
            .forEach((recordRow) => {
                accountTotalDebit += Number(recordRow.debit)
                accountTotalCredit += Number(recordRow.credit)
            })

        const accountBalance = accountTotalDebit - accountTotalCredit

        if (accountBalance < 0 && account.balanceSheetLiabilityFlow === "debit") {
            return
        }

        if (accountBalance > 0 && account.balanceSheetLiabilityFlow === "credit") {
            return
        }

        if (account.balanceSheetLiabilityColumn === "net") {
            netTotalAmount += Math.abs(accountBalance)
        }
    })

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
                {
                    (props.balanceSheets.length === 0)
                        ? (
                            <Table.Body.Root className="border-b border-neutral/10 last:border-b-0">
                                <Table.Body.Row>
                                    <Table.Body.Cell>
                                        <FormatNull />
                                    </Table.Body.Cell>
                                </Table.Body.Row>
                            </Table.Body.Root>
                        )
                        : (
                            <Fragment>
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
                                                <BalanceSheetLiabilitiesReportItem
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
                                <BalanceSheetLiabilitiesReportRow
                                    level={0}
                                    number={" "}
                                    label={"Total"}
                                    netAmount={netTotalAmount}
                                    isAmountDisplayed={true}
                                />
                            </Fragment>
                        )
                }
            </Table.Body.Root>
        </Table.Root>
    )
}
