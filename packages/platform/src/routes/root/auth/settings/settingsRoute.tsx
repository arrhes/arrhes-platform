import { createRoute } from "@tanstack/react-router"
import { SettingsPage } from "features/settings/settingsPage"
import { settingsLayoutRoute } from "routes/root/auth/settings/settingsLayoutRoute"


export const settingsRoute = createRoute({
    getParentRoute: () => settingsLayoutRoute,
    path: "/",
    beforeLoad: () => { },
    component: () => (
        <SettingsPage />
    )
})
