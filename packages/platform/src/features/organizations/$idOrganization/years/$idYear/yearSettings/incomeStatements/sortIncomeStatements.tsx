import { returnedSchemas } from "@arrhes/metadata/schemas"
import * as v from "valibot"



export function sortIncomeStatements(parameters: {
    incomeStatements: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
}) {
    if (parameters.incomeStatements.length === 0) return []

    const map = new Map(parameters.incomeStatements.map(i => [i.id, i]))

    function getLevel(incomeStatement: (typeof parameters.incomeStatements)[number]) {
        let level = 0
        let current = incomeStatement
        while (current.idIncomeStatementParent && map.has(current.idIncomeStatementParent)) {
            current = map.get(current.idIncomeStatementParent)!
            level += 1
        }
        return level
    }

    return parameters.incomeStatements
        .map((incomeStatement) => {
            return ({
                incomeStatement: incomeStatement,
                level: getLevel(incomeStatement)
            })
        })
}
