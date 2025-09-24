import { $idAccountRoutes } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/$idAccountRoutes.js"
import { createOneAccountRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/createOneAccount.js"
import { generateAccountsRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/generateAccounts.js"
import { readAllAccountsRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/readAllAccounts.js"


export const accountsRoutes = [
    createOneAccountRoute,
    readAllAccountsRoute,
    generateAccountsRoute,

    ...$idAccountRoutes,
]