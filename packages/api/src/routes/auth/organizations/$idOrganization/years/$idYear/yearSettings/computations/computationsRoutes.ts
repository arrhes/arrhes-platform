import { $idComputationRoutes } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/$idComputation/$idComputationRoutes.js"
import { createOneComputationRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/createOneComputation.js"
import { generateComputationsRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/generateComputations.js"
import { readAllComputationsRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/computations/readAllComputations.js"


export const computationsRoutes = [
    createOneComputationRoute,
    readAllComputationsRoute,
    generateComputationsRoute,

    ...$idComputationRoutes,
]
