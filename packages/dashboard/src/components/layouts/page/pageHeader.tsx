import { ComponentProps, ReactNode } from "react"
import { css, cx } from "../../../utilities/cn.js"



export function PageHeader(props: {
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
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "1rem",
                }),
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
