import { createRoute } from "@tanstack/react-router"
import { ComptabiliteDocuments } from "../../../../features/docs/comptabilite/documents.tsx"
import { accountingLayoutRoute } from "./accountingLayoutRoute.js"


export const documentsRoute = createRoute({
    getParentRoute: () => accountingLayoutRoute,
    path: "/documents",
    beforeLoad: () => ({
        title: "Les documents comptables - Arrhes"
    }),
    component: () => (
        <ComptabiliteDocuments />
    )
})
