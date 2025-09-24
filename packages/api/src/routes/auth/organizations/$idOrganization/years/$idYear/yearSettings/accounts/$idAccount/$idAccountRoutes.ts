import { deleteOneAccountRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/deleteOneAccount.js"
import { readOneAccountRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/readOneAccount.js"
import { updateOneAccountRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/updateOneAccount.js"


export const $idAccountRoutes = [
    deleteOneAccountRoute,
    readOneAccountRoute,
    updateOneAccountRoute,
]