import { readAllAccountsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useState } from "react"
import * as v from "valibot"
import { FormatNull } from "../../../../../../../../components/formats/formatNull.tsx"
import { InputDebounced } from "../../../../../../../../components/inputs/inputDebounced.tsx"
import { InputText } from "../../../../../../../../components/inputs/inputText.tsx"
import { DataWrapper } from "../../../../../../../../components/layouts/dataWrapper.tsx"
import { AccountItem } from "./accountItem.tsx"
import { sortAccounts } from "./sortAccounts.tsx"


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
                    <div className={css({ h: "fit", w: "fit", display: "flex", flexDir: "column", justifyContent: "flex-start", alignItems: "flex-start", p: "4", gap: "4" })}>
                        <InputDebounced
                            value={globalFilter ?? ""}
                            onChange={(value) => setGlobalFilter(value ?? "")}
                        >
                            <InputText
                                placeholder="Recherche"
                                className={css({ maxW: "320px" })}
                            />
                        </InputDebounced>
                        <div className={css({ h: "fit", w: "fit", display: "flex", flexDir: "column", justifyContent: "flex-start", alignItems: "flex-start" })}>
                            {
                                (groupedAccounts.length !== 0)
                                    ? (null)
                                    : (
                                        <FormatNull
                                            text="Aucun compte n'a été trouvé"
                                            className={css({ p: "2" })}
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
