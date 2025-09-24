import { RouterProvider as Router } from "@tanstack/react-router"
import { platformRouter } from "routes/platformRouter"


export function RouterProvider() {
    return (
        <Router
            router={platformRouter}
        />
    )
}
