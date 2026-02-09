import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../../utilities/cn.js"


export function CardContent(props: {
    className?: ComponentProps<'div'>['className']
    children: ReactElement | ReactElement[]
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
                    alignItems: "flex-start"
                }),
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
