import { css } from "../utilities/cn.js"
import { useDeviceDetect } from "../utilities/useDeviceDetect.js"
import { Outlet } from "@tanstack/react-router"


export function RootLayout() {
    const { isMobile } = useDeviceDetect()

    if (isMobile === true) {
        <div className={css({
            w: "full",
            h: "full",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bg: "warning/5",
            p: "4"
        })}>
            <span className={css({ color: "warning" })}>
                La plateforme n'est pas encore disponible sur mobile. Veuillez utiliser un ordinateur.
            </span>
        </div>
    }
    return (
        <div className={css({
            position: "relative",
            minH: "full",
            h: "fit",
            w: "full",
            maxW: "full",
            display: "flex",
            flexDir: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            overflow: "auto"
        })}>
            <Outlet />
        </div>
    )
}
