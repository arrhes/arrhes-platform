import { createRoute } from "@tanstack/react-router"
import { settingsLayoutRoute } from "./settingsLayoutRoute.js"
import { SettingsPage } from "../../../../features/dashboard/settings/settingsPage.js"


export const settingsRoute = createRoute({
    getParentRoute: () => settingsLayoutRoute,
    path: "/",
    beforeLoad: () => { },
    component: () => (
        <SettingsPage />
    )
})
