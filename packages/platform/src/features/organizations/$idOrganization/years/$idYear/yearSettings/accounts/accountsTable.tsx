import { FormatNull } from "#/components/formats/formatNull.js";
import { DataWrapper } from "#/components/layouts/dataWrapper.js";
import { AccountItem } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountItem.js";
import { groupAccounts } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/groupAccounts.js";
import { readAllAccountsRouteDefinition } from "@arrhes/metadata/routes";
import { returnedSchemas } from "@arrhes/metadata/schemas";
import * as v from "valibot";


export function AccountsTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
}) {
    return (
        <DataWrapper
            routeDefinition={readAllAccountsRouteDefinition}
            body={{
                idOrganization: props.idOrganization,
                idYear: props.idYear
            }}
        >
            {(accounts) => {
                const groupedAccounts = groupAccounts({
                    accounts: accounts,
                    digits: 1
                })
                    .sort((a, b) => a.account.number.toString().localeCompare(b.account.number.toString()))

                if (groupedAccounts.length === 0) {
                    return (
                        <FormatNull
                            text="Aucun compte n'a été trouvé"
                            className="p-2"
                        />
                    )
                }
                return (
                    <div className="h-fit w-fit flex flex-col justify-start items-start p-4">
                        {groupedAccounts.map((groupedAccount, index) => (
                            <AccountItem
                                key={groupedAccount.account.id}
                                idOrganization={props.idOrganization}
                                idYear={props.idYear}
                                groupedAccount={groupedAccount}
                                displayIndexes={[]}
                                currentIndex={index}
                                length={groupedAccounts.length}
                                level={0}
                            />
                        ))}
                    </div>
                )
            }}
        </DataWrapper>
    )
}