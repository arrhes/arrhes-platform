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
            gap: "4",
            p: "4"
        })}>
            {props.children}
        </div>
    )
}
