import { JSX } from "react"
import { css } from "../../../utilities/cn.js"


export function DrawerBody(props: {
    children: JSX.Element
}) {
    return (
        <div className={css({
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "1rem",
            padding: "1rem"
        })}>
            {props.children}
        </div>
    )
}
