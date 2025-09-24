import { cookiePrefix } from "utilities/variables"
import { getCookie } from "./getCookie"


export function getIsAuthenticated() {
    const isAuthenticatedRaw = getCookie(`${cookiePrefix}_${"is_auth"}`)

    if (isAuthenticatedRaw === "true") return true
    if (isAuthenticatedRaw === "false") return false

    return undefined
}