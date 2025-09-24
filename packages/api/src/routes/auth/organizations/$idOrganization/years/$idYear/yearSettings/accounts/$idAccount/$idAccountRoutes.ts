import { deleteOneAccountRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/deleteOneAccount.js"
import { readOneAccountRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/readOneAccount.js"
import { updateOneAccountRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/updateOneAccount.js"


export const $idAccountRoutes = [
    deleteOneAccountRoute,
    readOneAccountRoute,
    updateOneAccountRoute,
]