import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../../utilities/cn.js"


export function DataBlockHeader(props: {
    children: null | ReactElement | (null | ReactElement)[]
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cx(
                css({
                    flexShrink: "0",
                    width: "100%",
                    height: "fit",
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
