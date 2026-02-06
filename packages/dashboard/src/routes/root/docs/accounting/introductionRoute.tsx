import { createRoute } from "@tanstack/react-router"
import { ComptabiliteIntroduction } from "../../../../features/docs/comptabilite/introduction.tsx"
import { accountingLayoutRoute } from "./accountingLayoutRoute.tsx"


export const introductionRoute = createRoute({
    getParentRoute: () => accountingLayoutRoute,
    path: "/introduction",
    beforeLoad: () => ({
        title: "Introduction a la comptabilite - Arrhes"
    }),
    component: () => (
        <ComptabiliteIntroduction />
    )
})
