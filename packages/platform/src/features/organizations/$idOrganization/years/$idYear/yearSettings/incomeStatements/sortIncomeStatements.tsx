import { getIncomeStatementLevel } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/getIncomeStatementLevel.js"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import * as v from "valibot"



export function sortIncomeStatements(parameters: {
    incomeStatements: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
}) {
    if (parameters.incomeStatements.length === 0) return []

    return parameters.incomeStatements
        .map((incomeStatement) => {
            return ({
                incomeStatement: incomeStatement,
                level: getIncomeStatementLevel({
                    incomeStatement: incomeStatement,
                    incomeStatements: parameters.incomeStatements
                })
            })
        })
}
