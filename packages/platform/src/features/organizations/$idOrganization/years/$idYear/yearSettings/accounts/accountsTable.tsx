import { readAllAccountsRouteDefinition } from "@arrhes/schemas/routes";
import { returnedSchemas } from "@arrhes/schemas/schemas";
import { FormatNull } from "components/formats/formatNull";
import { DataWrapper } from "components/layouts/dataWrapper";
import { AccountItem } from "features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountItem";
import { groupAccounts } from "features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/groupAccounts";
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