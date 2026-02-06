import { createRoute } from "@tanstack/react-router"
import { ComptabiliteEcritures } from "../../../../features/docs/comptabilite/ecritures.tsx"
import { accountingLayoutRoute } from "./accountingLayoutRoute.tsx"


export const recordsRoute = createRoute({
    getParentRoute: () => accountingLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Les ecritures comptables - Arrhes"
    }),
    component: () => (
        <ComptabiliteEcritures />
    )
})
