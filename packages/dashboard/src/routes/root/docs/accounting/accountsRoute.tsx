import { createRoute } from "@tanstack/react-router"
import { ComptabiliteComptes } from "../../../../features/docs/comptabilite/comptes.tsx"
import { accountingLayoutRoute } from "./accountingLayoutRoute.js"


export const accountsRoute = createRoute({
    getParentRoute: () => accountingLayoutRoute,
    path: "/comptes",
    beforeLoad: () => ({
        title: "Les comptes comptables - Arrhes"
    }),
    component: () => (
        <ComptabiliteComptes />
    )
})
