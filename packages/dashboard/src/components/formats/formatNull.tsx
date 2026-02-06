import { css, cx } from "../../utilities/cn.js"
import { ComponentProps } from "react"


type FormatNull = {
    text?: string
    className?: ComponentProps<'span'>['className']
}

export function FormatNull(props: FormatNull) {
    return (
        <span className={cx(
            css({
                display: "inline-flex",
                flexDir: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                fontSize: "sm",
                fontStyle: "italic",
                color: "neutral/25",
                whiteSpace: "nowrap",
                overflow: "auto",
                textOverflow: "ellipsis"
            }),
            props.className
        )}>
            {props.text ?? "/"}
        </span>
    )
}
