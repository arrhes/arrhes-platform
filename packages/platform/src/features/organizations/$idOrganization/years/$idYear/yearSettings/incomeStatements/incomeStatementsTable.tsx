import { readAllIncomeStatementsRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { FormatNull } from "components/formats/formatNull"
import { DataWrapper } from "components/layouts/dataWrapper"
import { groupIncomeStatements } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/groupIncomeStatements"
import { IncomeStatementItem } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementItem"
import * as v from "valibot"


export function IncomeStatementsTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
}) {
    return (
        <DataWrapper
            routeDefinition={readAllIncomeStatementsRouteDefinition}
            body={{
                idOrganization: props.idOrganization,
                idYear: props.idYear
            }}
        >
            {(incomeStatements) => {
                const groupedIncomeStatements = groupIncomeStatements({
                    incomeStatements: incomeStatements,
                    digits: 1
                })
                    .sort((a, b) => a.incomeStatement.number.toString().localeCompare(b.incomeStatement.number.toString()))

                if (groupedIncomeStatements.length === 0) {
                    return (
                        <FormatNull
                            text="Aucune ligne de compte de résultat n'a été trouvée"
                            className="p-2"
                        />
                    )
                }
                return (
                    <div className="h-fit min-w-full w-fit flex flex-col justify-start items-start p-4">
                        {groupedIncomeStatements.map((groupedIncomeStatement, index) => (
                            <IncomeStatementItem
                                key={groupedIncomeStatement.incomeStatement.id}
                                idOrganization={props.idOrganization}
                                idYear={props.idYear}
                                groupedIncomeStatement={groupedIncomeStatement}
                                displayIndexes={[]}
                                currentIndex={index}
                                length={groupedIncomeStatements.length}
                                level={0}
                            />
                        ))}
                    </div>
                )
            }}
        </DataWrapper>
    )
}