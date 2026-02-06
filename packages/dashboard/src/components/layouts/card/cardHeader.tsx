import { css, cx } from "../../../utilities/cn.js"
import { ComponentProps, ReactNode } from "react"



export function CardHeader(props: {
    children?: ReactNode
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cx(
                css({
                    w: "full",
                    h: "fit",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "2",
                    p: "2"
                }),
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
