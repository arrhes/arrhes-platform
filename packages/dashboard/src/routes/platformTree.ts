import { AnyRoute } from "@tanstack/react-router"
import { catchRoute } from "../routes/catchRoute.js"
import { dashboardTree } from "./root/dashboard/dashboardTree.js"
import { docsTree } from "./root/docs/docsTree.js"
import { signInRoute } from "./root/signIn/signInRoute.js"
import { signUpRoute } from "./root/signUp/signUpRoute.js"
import { websiteLayoutRoute } from "./root/website/websiteLayoutRoute.js"
import { websiteRootRoute } from "./root/website/websiteRootRoute.js"
import { rootLayoutRoute } from "./rootLayoutRoute.js"


export const platformTree: AnyRoute = rootLayoutRoute.addChildren([
    websiteLayoutRoute.addChildren([
        websiteRootRoute,
    ]),

    docsTree,
    signUpRoute,
    signInRoute,
    dashboardTree,

    catchRoute,
])
