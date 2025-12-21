import { SettingsPage } from "#/features/settings/settingsPage.js"
import { settingsLayoutRoute } from "#/routes/root/auth/settings/settingsLayoutRoute.js"
import { createRoute } from "@tanstack/react-router"


export const settingsRoute = createRoute({
    getParentRoute: () => settingsLayoutRoute,
    path: "/",
    beforeLoad: () => { },
    component: () => (
        <SettingsPage />
    )
})
