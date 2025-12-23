import { IncomeStatementReportRow } from "#/features/organizations/$idOrganization/years/$idYear/reports/incomeStatementReport/incomeStatementReportRow.js"
import { getIncomeStatementChildren } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/getIncomeStatementChildren.js"
import { toRoman } from "#/utilities/toRoman.js"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ComponentProps, Fragment } from "react"
import * as v from "valibot"


export function IncomeStatementReportItem(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    incomeStatement: v.InferOutput<typeof returnedSchemas.incomeStatement>
    incomeStatementChildren: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
    level: number
    className?: ComponentProps<'div'>['className']
}) {

    const number = (props.level === 0)
        ? toRoman(Number(props.incomeStatement.number))
        : null

    const label = props.incomeStatement.label

    const isAmountDisplayed = (props.incomeStatement.isComputed === true || props.incomeStatementChildren.length === 0)

    let netAmount = 0
    props.accounts
        .filter((account) => {
            const hasAccount = props.incomeStatement.id === account.idIncomeStatement
            const hasChildrenAccount = props.incomeStatementChildren.some((incomeStatement) => incomeStatement.id === account.idIncomeStatement)
            return hasAccount || hasChildrenAccount
        })
        .forEach((account) => {
            let accountTotalDebit = 0
            let accountTotalCredit = 0

            props.recordRows
                .filter((recordRow) => recordRow.idAccount === account.id)
                .forEach((recordRow) => {
                    accountTotalDebit += Number(recordRow.debit)
                    accountTotalCredit += Number(recordRow.credit)
                })

            const accountBalance = accountTotalDebit - accountTotalCredit

            netAmount += Math.abs(accountBalance)
        })

    return (
        <Fragment>
            <IncomeStatementReportRow
                key={props.incomeStatement.id}
                level={props.level}
                number={number}
                label={label}
                amount={netAmount}
                isAmountDisplayed={isAmountDisplayed}
            />
            {
                props.incomeStatementChildren
                    .filter((incomeStatement) => incomeStatement.idIncomeStatementParent === props.incomeStatement.id)
                    .map((incomeStatement) => {
                        const incomeStatementChildren = getIncomeStatementChildren({
                            incomeStatement: incomeStatement,
                            incomeStatements: props.incomeStatementChildren,
                        })

                        return (
                            <IncomeStatementReportItem
                                key={incomeStatement.id}
                                idOrganization={props.idOrganization}
                                idYear={props.idYear}
                                accounts={props.accounts}
                                recordRows={props.recordRows}
                                incomeStatement={incomeStatement}
                                incomeStatementChildren={incomeStatementChildren}
                                level={props.level + 1}
                            />
                        )
                    })
            }
        </Fragment>
    )
}
