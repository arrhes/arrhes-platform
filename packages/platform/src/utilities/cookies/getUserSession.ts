import { getIsAuthenticated } from "#/utilities/cookies/getIsAuthenticated.js"
import { postAPI } from "#/utilities/postAPI.js"
import { readUserSessionRouteDefinition } from "@arrhes/metadata/routes"


export async function getUserSession() {
    const isAuthenticated = getIsAuthenticated()

    if (isAuthenticated === true) {
        const response = await postAPI({
            routeDefinition: readUserSessionRouteDefinition,
            body: {},
        })
        if (!response.ok) return undefined
        return response.data
    }
    return undefined
}