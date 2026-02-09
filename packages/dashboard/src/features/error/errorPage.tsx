import { css } from "../../utilities/cn.js"


export function ErrorPage() {
    return (
        <div className={css({ minwidth: "100%", width: "100%", maxWidth: "100%", minH: "100%", height: "100%", maxH: "100%", overflowidth: "auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" })}>
            <p className={css({ color: "error", fontSize: "sm" })}>
                Erreur
            </p>
        </div>
    )
}