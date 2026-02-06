import { css, cx } from "../../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function CardContent(props: {
    className?: ComponentProps<'div'>['className']
    children: ReactElement | ReactElement[]
}) {
    return (
        <div
            className={cx(
                css({
                    w: "full",
                    h: "fit",
                    display: "flex",
                    flexDir: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                }),
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
