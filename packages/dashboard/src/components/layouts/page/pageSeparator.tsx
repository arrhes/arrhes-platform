import { ComponentProps } from "react"
import { css, cx } from "../../../utilities/cn.js"


type PageSeparator = ComponentProps<"div">

export function PageSeparator(props: PageSeparator) {
    return (
        <div
            className={
                cx(
                    css({
                        width: "100%",
                        height: "1px",
                        borderBottom: "1px solid",
                        borderColor: "neutral/10"
                    }),
                    props.className
                )
            }
        />
    )
}
