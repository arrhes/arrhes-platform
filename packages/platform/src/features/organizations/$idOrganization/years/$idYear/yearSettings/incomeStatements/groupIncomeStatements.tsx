import { returnedSchemas } from "@arrhes/schemas/schemas"
import * as v from "valibot"


export type GroupedIncomeStatement = {
    incomeStatement: v.InferOutput<typeof returnedSchemas.incomeStatement>
    subIncomeStatements: GroupedIncomeStatement[]
}

export function groupIncomeStatements(parameters: {
    incomeStatements: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
    digits: number
}) {
    if (parameters.incomeStatements.length === 0) return []
    return parameters.incomeStatements
        .filter((incomeStatement) => incomeStatement.number.toString().length === parameters.digits)
        .map((incomeStatement) => {
            const subIncomeStatements = groupIncomeStatements({
                incomeStatements: parameters.incomeStatements
                    .filter((_incomeStatement) => _incomeStatement.number.toString().slice(0, parameters.digits) === incomeStatement.number.toString().slice(0, parameters.digits)),
                digits: parameters.digits + 1
            }) as GroupedIncomeStatement[]
            return ({
                incomeStatement: incomeStatement,
                subIncomeStatements: subIncomeStatements
            })
        }) as GroupedIncomeStatement[]
}
