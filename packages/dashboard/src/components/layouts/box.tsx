import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../utilities/cn.js"


export function Box(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cx(
                css({
                    minWidth: "0",
                    width: "100%",
                    maxWidth: "100%",
                    height: "fit",
                    flexShrink: "0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    overflowX: "auto",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    borderRadius: "md"
                }),
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
