import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import * as v from "valibot"



export function sortAccounts(parameters: {
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
}) {
    if (parameters.accounts.length === 0) return []

    const map = new Map(parameters.accounts.map(i => [i.id, i]))

    function getLevel(account: (typeof parameters.accounts)[number]) {
        let level = 0
        let current = account
        while (current.idAccountParent && map.has(current.idAccountParent)) {
            current = map.get(current.idAccountParent)!
            level += 1
        }
        return level
    }

    return parameters.accounts
        .map((account) => {
            return ({
                account: account,
                level: getLevel(account)
            })
        })
}
