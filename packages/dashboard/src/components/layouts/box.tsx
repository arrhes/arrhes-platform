import { css, cx } from "../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function Box(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cx(
                css({
                    minW: "0",
                    w: "full",
                    maxW: "full",
                    h: "fit",
                    flexShrink: "0",
                    display: "flex",
                    flexDir: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    overflowX: "auto",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    rounded: "md"
                }),
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
