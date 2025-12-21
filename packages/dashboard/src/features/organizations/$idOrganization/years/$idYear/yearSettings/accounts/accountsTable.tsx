import { FormatNull } from "#/components/formats/formatNull.js"
import { InputDebounced } from "#/components/inputs/inputDebounced.js"
import { InputText } from "#/components/inputs/inputText.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { AccountItem } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountItem.js"
import { sortAccounts } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/sortAccounts.js"
import { readAllAccountsRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { useState } from "react"
import * as v from "valibot"


export function AccountsTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
}) {
    const [globalFilter, setGlobalFilter] = useState("")

    return (
        <DataWrapper
            routeDefinition={readAllAccountsRouteDefinition}
            body={{
                idOrganization: props.idOrganization,
                idYear: props.idYear
            }}
        >
            {(accounts) => {
                // const filteredAccounts = accounts.filter((account) => {
                //     const processedAccount = `${account.number} ${account.label}`.toLowerCase()
                //     const processedFilter = globalFilter.toLowerCase()
                //     return processedAccount.includes(processedFilter)
                // })

                const groupedAccounts = sortAccounts({
                    accounts: accounts,
                })
                    .filter((sortedAccount) => {
                        const processedAccount = `${sortedAccount.account.number} ${sortedAccount.account.label}`.toLowerCase()
                        const processedFilter = globalFilter.toLowerCase()
                        return processedAccount.includes(processedFilter)
                    })
                    .sort((a, b) => a.account.number.toString().localeCompare(b.account.number.toString()))

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
                                (groupedAccounts.length !== 0)
                                    ? (null)
                                    : (
                                        <FormatNull
                                            text="Aucun compte n'a été trouvé"
                                            className="p-2"
                                        />
                                    )
                            }
                            {groupedAccounts.map((sortedAccount, index) => (
                                <AccountItem
                                    key={sortedAccount.account.id}
                                    idOrganization={props.idOrganization}
                                    idYear={props.idYear}
                                    account={sortedAccount.account}
                                    level={sortedAccount.level}
                                    displayIndexes={[]}
                                    currentIndex={index}
                                    length={groupedAccounts.length}
                                />
                            ))}
                        </div>
                    </div>
                )
            }}
        </DataWrapper>
    )
}