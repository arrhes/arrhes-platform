import { useDeviceDetect } from "#/utilities/useDeviceDetect.js"
import { Outlet } from "@tanstack/react-router"


export function RootLayout() {
    const { isMobile } = useDeviceDetect()

    if (isMobile === true) {
        <div className="w-full h-full flex justify-center items-center bg-warning/5 p-4">
            <span className="text-warning">
                La plateforme n'est pas encore disponible sur mobile. Veuillez utiliser un ordinateur.
            </span>
        </div>
    }
    return (
        <div className="relative min-h-full h-fit w-full max-w-full flex flex-col justify-start items-stretch overflow-auto">
            <Outlet />
        </div>
    )
}
