import { readAllAccountsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconListNumbers } from "@tabler/icons-react"
import { useState } from "react"
import * as v from "valibot"
import { InputDebounced } from "../../../../../../../../components/inputs/inputDebounced.tsx"
import { InputText } from "../../../../../../../../components/inputs/inputText.tsx"
import { DataWrapper } from "../../../../../../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../../../../../../components/layouts/emptyState.tsx"
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
                    <div className={css({ height: "fit", width: "fit", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", padding: "4", gap: "4" })}>
                        <InputDebounced
                            value={globalFilter ?? ""}
                            onChange={(value) => setGlobalFilter(value ?? "")}
                        >
                            <InputText
                                placeholder="Recherche"
                                className={css({ maxWidth: "320px" })}
                            />
                        </InputDebounced>
                        <div className={css({ height: "fit", width: "fit", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" })}>
                            {groupedAccounts.length === 0 && (
                                <EmptyState
                                    icon={<IconListNumbers size={48} />}
                                    title={globalFilter ? "Aucun compte trouvé" : "Aucun compte"}
                                    subtitle={globalFilter ? undefined : "Ajoutez un compte pour commencer"}
                                />
                            )}
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
