import { createRoute, Outlet } from "@tanstack/react-router"
import { recordLayoutRoute } from "../../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/records/$idRecord/recordLayoutRoute.js"


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
