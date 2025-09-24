import { readUserSessionRouteDefinition } from "@arrhes/schemas/routes"
import { getIsAuthenticated } from "utilities/cookies/getIsAuthenticated"
import { postAPI } from "utilities/postAPI"


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