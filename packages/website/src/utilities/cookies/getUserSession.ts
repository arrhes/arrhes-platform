import { readUserSessionRouteDefinition } from "@arrhes/application-metadata/routes"
import { postAPI } from "../postAPI.js"
import { getIsAuthenticated } from "./getIsAuthenticated.js"


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