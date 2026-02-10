import { ComponentProps } from "react"
import { css } from "../../../utilities/cn.js"



export function PageTitle(props: {
    children?: string
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <span
            className={css({
                fontSize: "lg",
                fontWeight: "semibold",
                whiteSpace: "nowrap"
            })}
        >
            {props.children}
        </span>
    )
}
