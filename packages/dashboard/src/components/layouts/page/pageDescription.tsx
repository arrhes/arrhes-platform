import { ComponentProps } from "react"
import { css } from "../../../utilities/cn.js"



export function PageDescription(props: {
    children: string
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <span
            className={css({
                color: "neutral/50",
                fontSize: "md"
            })}
        >
            {props.children}
        </span>
    )
}
