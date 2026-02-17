import { createRoute } from "@tanstack/react-router"
import { FilesPage } from "../../../../../../../../features/dashboard/organizations/$idOrganization/years/$idYear/files/filesPage.js"
import { filesLayoutRoute } from "./filesLayoutRoute.js"

export const filesRoute = createRoute({
    getParentRoute: () => filesLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <FilesPage />,
})
