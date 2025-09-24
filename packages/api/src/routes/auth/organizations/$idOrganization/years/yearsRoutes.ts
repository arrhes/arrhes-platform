import { $idYearRoutes } from "#src/routes/auth/organizations/$idOrganization/years/$idYear/$idYearRoutes.js"
import { createOneYearRoute } from "#src/routes/auth/organizations/$idOrganization/years/createOneYear.js"
import { readAllYearsRoute } from "#src/routes/auth/organizations/$idOrganization/years/readAllYears.js"


export const yearsRoutes = [
    createOneYearRoute,
    readAllYearsRoute,

    ...$idYearRoutes,
]