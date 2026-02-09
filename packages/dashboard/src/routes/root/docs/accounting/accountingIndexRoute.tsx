import { createRoute } from "@tanstack/react-router"
import { ComptabiliteIndex } from "../../../../features/docs/comptabiliteIndex.js"
import { accountingLayoutRoute } from "./accountingLayoutRoute.js"


export const accountingIndexRoute = createRoute({
    getParentRoute: () => accountingLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Comptabilité - Documentation - Arrhes"
    }),
    component: () => (
        <ComptabiliteIndex />
    )
})
