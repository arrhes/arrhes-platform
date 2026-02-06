import { css, cx } from "../../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function DataBlockRoot(props: {
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
                    flexDir: "column",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    gap: "2"
                }),
                props.className
            )}
            children={props.children}
        />
    )
}
