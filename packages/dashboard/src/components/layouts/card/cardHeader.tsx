import { ComponentProps, ReactNode } from "react"
import { css, cx } from "../../../utilities/cn.js"



export function CardHeader(props: {
    children?: ReactNode
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    height: "fit",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "2",
                    padding: "1rem"
                }),
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
