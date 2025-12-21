import { FormatNull } from "#/components/formats/formatNull.js"
import { InputDebounced } from "#/components/inputs/inputDebounced.js"
import { InputText } from "#/components/inputs/inputText.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { getIncomeStatementChildren } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/getIncomeStatementChildren.js"
import { IncomeStatementItem } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementItem.js"
import { readAllIncomeStatementsRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { useState } from "react"
import * as v from "valibot"


export function IncomeStatementsTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
}) {
    const [globalFilter, setGlobalFilter] = useState("")

    return (
        <DataWrapper
            routeDefinition={readAllIncomeStatementsRouteDefinition}
            body={{
                idOrganization: props.idOrganization,
                idYear: props.idYear
            }}
        >
            {(incomeStatements) => {

                const filteredIncomeStatements = incomeStatements
                    .filter((incomeStatement) => incomeStatement.idIncomeStatementParent === null)
                    .sort((a, b) => Number(a.number) - Number(b.number))

                return (
                    <div className="h-fit w-fit flex flex-col justify-start items-start p-4 gap-4">
                        <InputDebounced
                            value={globalFilter ?? ""}
                            onChange={(value) => setGlobalFilter(value ?? "")}
                        >
                            <InputText
                                placeholder="Recherche"
                                className="max-w-[320px]"
                            />
                        </InputDebounced>
                        <div className="h-fit w-fit flex flex-col justify-start items-start">
                            {
                                (filteredIncomeStatements.length !== 0)
                                    ? (null)
                                    : (
                                        <FormatNull
                                            text="Aucune ligne de compte de résultat n'a été trouvée"
                                            className="p-2"
                                        />
                                    )
                            }
                            {filteredIncomeStatements.map((incomeStatement) => {
                                const incomeStatementChildren = getIncomeStatementChildren({
                                    incomeStatement: incomeStatement,
                                    incomeStatements: incomeStatements,
                                })

                                return (
                                    <IncomeStatementItem
                                        key={incomeStatement.id}
                                        idOrganization={props.idOrganization}
                                        idYear={props.idYear}
                                        incomeStatement={incomeStatement}
                                        incomeStatementChildren={incomeStatementChildren}
                                        level={0}
                                    />
                                )
                            })}
                        </div>
                    </div>
                )
            }}
        </DataWrapper>
    )
}