import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function DataBlockContent(props: {
    children: null | ReactElement | (null | ReactElement)[]
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <div
            className={cx(
                css({
                    flexShrink: "0",
                    width: "100%",
                    height: "fit",
                    display: "grid",
                    gridTemplateColumns: "max-content auto",
                    columnGap: "6",
                    padding: "0",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    borderRadius: "md",
                    overflow: "hidden",
                }),
                props.className,
            )}
            children={props.children}
        />
    )
}
