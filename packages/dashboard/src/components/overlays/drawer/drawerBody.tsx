import { css } from "../../../utilities/cn.js"
import { JSX } from "react"


export function DrawerBody(props: {
    children: JSX.Element
}) {
    return (
        <div className={css({
            w: "full",
            display: "flex",
            flexDir: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "4",
            p: "4"
        })}>
            {props.children}
        </div>
    )
}
