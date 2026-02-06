import { AnyRoute } from "@tanstack/react-router"
import { accountLayoutRoute } from "../dashboard/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountLayoutRoute.js"
import { accountsRoute } from "./accounting/accountsRoute.js"
import { documentsRoute } from "./accounting/documentsRoute.js"
import { introductionRoute } from "./accounting/introductionRoute.js"
import { recordsRoute } from "./accounting/recordsRoute.js"
import { docsLayoutRoute } from "./docsLayoutRoute.js"
import { docsRootRoute } from "./docsRootRoute.js"
import { guideDemarrageRoute } from "./guide/demarrageRoute.js"
import { guideLayoutRoute } from "./guide/guideLayoutRoute.js"
import { guideOrganisationsRoute } from "./guide/organisationsRoute.js"
import { guideRapportsRoute } from "./guide/rapportsRoute.js"
import { guideRecordRowsRoute } from "./guide/recordRowsRoute.js"


export const docsTree: AnyRoute = docsLayoutRoute.addChildren([
    docsRootRoute,
    accountLayoutRoute.addChildren([
        introductionRoute,
        accountsRoute,
        recordsRoute,
        documentsRoute,
    ]),
    guideLayoutRoute.addChildren([
        guideDemarrageRoute,
        guideOrganisationsRoute,
        guideRecordRowsRoute,
        guideRapportsRoute,
    ])
])