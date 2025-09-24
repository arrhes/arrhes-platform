import { computationIncomeStatementsRoutes } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/$idComputation/computationIncomeStatements/computationIncomeStatementsRoutes.js"
import { deleteOneComputationRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/$idComputation/deleteOneComputation.js"
import { readOneComputationRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/$idComputation/readOneComputation.js"
import { updateOneComputationRoute } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/$idComputation/updateOneComputation.js"


export const $idComputationRoutes = [
    deleteOneComputationRoute,
    readOneComputationRoute,
    updateOneComputationRoute,

    ...computationIncomeStatementsRoutes,
]
