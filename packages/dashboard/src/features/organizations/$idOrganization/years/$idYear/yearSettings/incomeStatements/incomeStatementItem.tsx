import { getIncomeStatementChildren } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/getIncomeStatementChildren.js"
import { IncomeStatementRow } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementRow.js"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ComponentProps, Fragment } from "react"
import * as v from "valibot"


export function IncomeStatementItem(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    incomeStatement: v.InferOutput<typeof returnedSchemas.incomeStatement>
    incomeStatementChildren: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
    level: number
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <Fragment>
            <IncomeStatementRow
                idOrganization={props.idOrganization}
                idYear={props.idYear}
                incomeStatement={props.incomeStatement}
                level={props.level}
            />
            {
                props.incomeStatementChildren
                    .filter((incomeStatement) => incomeStatement.idIncomeStatementParent === props.incomeStatement.id)
                    .map((incomeStatement) => {
                        const children = getIncomeStatementChildren({
                            incomeStatement: incomeStatement,
                            incomeStatements: props.incomeStatementChildren,
                        })

                        return (
                            <IncomeStatementItem
                                key={incomeStatement.id}
                                idOrganization={props.idOrganization}
                                idYear={props.idYear}
                                incomeStatement={incomeStatement}
                                incomeStatementChildren={children}
                                level={props.level + 1}
                            />
                        )
                    })
            }
        </Fragment>
    )
}
