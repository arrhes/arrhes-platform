import { css, cx } from "../../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function DataBlockHeader(props: {
    children: null | ReactElement | (null | ReactElement)[]
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cx(
                css({
                    flexShrink: "0",
                    w: "full",
                    h: "fit",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "2"
                }),
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
