import { $idYearRoutes } from "#/routes/auth/organizations/$idOrganization/years/$idYear/$idYearRoutes.js"
import { createOneYearRoute } from "#/routes/auth/organizations/$idOrganization/years/createOneYear.js"
import { readAllYearsRoute } from "#/routes/auth/organizations/$idOrganization/years/readAllYears.js"


export const yearsRoutes = [
    createOneYearRoute,
    readAllYearsRoute,

    ...$idYearRoutes,
]