import { css } from "@arrhes/ui/utilities/cn.js"
import { ReactNode } from "react"


export function DocRoot(props: {
    children: ReactNode
}) {
    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "2rem"
            })}
        >
            {props.children}
        </div>
    )
}
