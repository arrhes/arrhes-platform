import { returnedSchemas } from "@arrhes/metadata/schemas"
import * as v from "valibot"


export function getIncomeStatementChildren(parameters: {
    incomeStatement: v.InferOutput<typeof returnedSchemas.incomeStatement>
    incomeStatements: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
}) {
    const map = new Map(parameters.incomeStatements.map(i => [i.id, i]))

    let children: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>> = []

    function findChildren(statementId: string) {
        const childrenStatements = Array.from(map.values()).filter(i => i.idIncomeStatementParent === statementId)
        for (const child of childrenStatements) {
            children.push(child)
            findChildren(child.id) // Recursive call to find nested children
        }
    }

    // Start recursion from the provided incomeStatement's id
    findChildren(parameters.incomeStatement.id)

    return children

}
