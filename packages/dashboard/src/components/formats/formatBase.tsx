import { css, cx } from "../../utilities/cn.js"
import { ComponentProps, ReactNode } from "react"


type FormatBase = {
    children: ReactNode
    className?: ComponentProps<'div'>['className']
}

export function FormatBase(props: FormatBase) {
    return (
        <div
            className={cx(
                css({
                    w: "fit",
                    maxW: "full",
                    overflow: "auto",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center"
                }),
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
