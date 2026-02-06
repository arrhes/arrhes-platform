import { css } from "../../utilities/cn.js"


export function ErrorPage() {
    return (
        <div className={css({ minW: "full", w: "full", maxW: "full", minH: "full", h: "full", maxH: "full", overflow: "auto", display: "flex", flexDir: "column", justifyContent: "center", alignItems: "center" })}>
            <p className={css({ color: "error", fontSize: "sm" })}>
                Erreur
            </p>
        </div>
    )
}