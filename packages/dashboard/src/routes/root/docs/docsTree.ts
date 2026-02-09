import { AnyRoute } from "@tanstack/react-router"
import { accountingIndexRoute } from "./accounting/accountingIndexRoute.js"
import { accountingLayoutRoute } from "./accounting/accountingLayoutRoute.js"
import { accountsRoute } from "./accounting/accountsRoute.js"
import { documentsRoute } from "./accounting/documentsRoute.js"
import { recordsRoute } from "./accounting/recordsRoute.js"
import { aiAnalyseRoute } from "./ai/analyseRoute.js"
import { aiAssistantRoute } from "./ai/assistantRoute.js"
import { aiIndexRoute } from "./ai/aiIndexRoute.js"
import { aiLayoutRoute } from "./ai/aiLayoutRoute.js"
import { apiIndexRoute } from "./api/apiIndexRoute.js"
import { apiLayoutRoute } from "./api/apiLayoutRoute.js"
import { cguRoute } from "./general/cguRoute.js"
import { confidentialiteRoute } from "./general/confidentialiteRoute.js"
import { docsLayoutRoute } from "./docsLayoutRoute.js"
import { docsRootRoute } from "./docsRootRoute.js"
import { fonctionnalitesRoute } from "./general/fonctionnalitesRoute.js"
import { guideDemarrageRoute } from "./guide/demarrageRoute.js"
import { guideIndexRoute } from "./guide/guideIndexRoute.js"
import { guideLayoutRoute } from "./guide/guideLayoutRoute.js"
import { guideOrganisationsRoute } from "./guide/organisationsRoute.js"
import { guideRapportsRoute } from "./guide/rapportsRoute.js"
import { guideRecordRowsRoute } from "./guide/recordRowsRoute.js"
import { mentionsLegalesRoute } from "./general/mentionsLegalesRoute.js"
import { supportRoute } from "./general/supportRoute.js"
import { tarifsRoute } from "./general/tarifsRoute.js"


export const docsTree: AnyRoute = docsLayoutRoute.addChildren([
    // General section (root)
    docsRootRoute,
    fonctionnalitesRoute,
    tarifsRoute,
    supportRoute,
    mentionsLegalesRoute,
    cguRoute,
    confidentialiteRoute,

    // Comptabilite section (cours de comptabilité)
    accountingLayoutRoute.addChildren([
        accountingIndexRoute,
        accountsRoute,
        recordsRoute,
        documentsRoute,
    ]),

    // Dashboard section (guide d'utilisation)
    guideLayoutRoute.addChildren([
        guideIndexRoute,
        guideDemarrageRoute,
        guideOrganisationsRoute,
        guideRecordRowsRoute,
        guideRapportsRoute,
    ]),

    // API section (single page - under development)
    apiLayoutRoute.addChildren([
        apiIndexRoute,
    ]),

    // AI section
    aiLayoutRoute.addChildren([
        aiIndexRoute,
        aiAssistantRoute,
        aiAnalyseRoute,
    ]),
])
