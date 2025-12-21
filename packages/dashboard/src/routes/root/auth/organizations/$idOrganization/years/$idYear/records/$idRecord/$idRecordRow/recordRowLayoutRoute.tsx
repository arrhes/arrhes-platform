import { recordLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/recordLayoutRoute.js"
import { createRoute, Outlet } from "@tanstack/react-router"


export const recordRowLayoutRoute = createRoute({
    getParentRoute: () => recordLayoutRoute,
    path: "/$idRecordRow",
    beforeLoad: () => ({
        title: "Ligne d'écriture"
    }),
    component: () => (
        <Outlet />
    )
})
