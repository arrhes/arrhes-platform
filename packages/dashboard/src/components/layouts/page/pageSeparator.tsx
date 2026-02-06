import { css, cx } from "../../../utilities/cn.js"
import { ComponentProps } from "react"


type PageSeparator = ComponentProps<"div">

export function PageSeparator(props: PageSeparator) {
    return (
        <div
            className={
                cx(
                    css({
                        w: "full",
                        h: "1px",
                        borderBottom: "1px solid",
                        borderColor: "neutral/10"
                    }),
                    props.className
                )
            }
        />
    )
}
