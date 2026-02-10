import { ComponentProps } from "react"
import { css, cx } from "../../utilities/cn.js"


export function TitleComponent(props: {
    children: string
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <span className={cx(
            css({
                textTransform: "uppercase",
                color: "neutral/25",
                fontSize: "base"
            }),
            props.className
        )}>
            {props.children}
        </span>
    )
}
