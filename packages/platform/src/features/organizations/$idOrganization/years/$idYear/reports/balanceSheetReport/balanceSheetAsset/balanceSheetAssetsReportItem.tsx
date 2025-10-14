import { BalanceSheetAssetsReportRow } from "#/features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetAsset/balanceSheetAssetsReportRow.js"
import { getBalanceSheetChildren } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/getBalanceSheetChildren.js"
import { toRoman } from "#/utilities/toRoman.js"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { ComponentProps, Fragment } from "react"
import * as v from "valibot"


export function BalanceSheetAssetsReportItem(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    balanceSheet: v.InferOutput<typeof returnedSchemas.balanceSheet>
    balanceSheetChildren: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
    level: number
    className?: ComponentProps<'div'>['className']
}) {

    const number = (props.level === 0)
        ? toRoman(Number(props.balanceSheet.number))
        : null

    const label = props.balanceSheet.label

    const isAmountDisplayed = (props.balanceSheet.isComputed === true || props.balanceSheetChildren.length === 0)

    let grossAmount = 0
    let amortizationAmount = 0
    props.accounts
        .filter((account) => {
            const hasAccount = (account.idBalanceSheetAsset === props.balanceSheet.id)
            const hasChildrenAccount = props.balanceSheetChildren.some((balanceSheet) => (balanceSheet.id === account.idBalanceSheetAsset))
            return hasAccount || hasChildrenAccount
        })
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
        <Fragment>
            <BalanceSheetAssetsReportRow
                key={props.balanceSheet.id}
                level={props.level}
                number={number}
                label={label}
                grossAmount={Math.abs(grossAmount)}
                amortizationAmount={-Math.abs(amortizationAmount)}
                isAmountDisplayed={isAmountDisplayed}
            />
            {
                props.balanceSheetChildren
                    .filter((balanceSheet) => balanceSheet.idBalanceSheetParent === props.balanceSheet.id)
                    .map((balanceSheet) => {
                        const balanceSheetChildren = getBalanceSheetChildren({
                            balanceSheet: balanceSheet,
                            balanceSheets: props.balanceSheetChildren,
                        })

                        return (
                            <BalanceSheetAssetsReportItem
                                key={balanceSheet.id}
                                idOrganization={props.idOrganization}
                                idYear={props.idYear}
                                accounts={props.accounts}
                                recordRows={props.recordRows}
                                balanceSheet={balanceSheet}
                                balanceSheetChildren={balanceSheetChildren}
                                level={props.level + 1}
                            />
                        )
                    })
            }
        </Fragment>
    )
}
