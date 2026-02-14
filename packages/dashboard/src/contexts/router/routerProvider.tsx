import { platformRouter } from "../../routes/platformRouter.js"
import { RouterProvider as Router } from "@tanstack/react-router"


export function RouterProvider() {
    return (
        <Router
            router={platformRouter}
        />
    )
}
