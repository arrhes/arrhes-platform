import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { ComponentProps } from "react"


export function DataBlockHeader(props: {
    title: string
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
            <span className={css({
                textTransform: "uppercase",
                color: "neutral/25",
                fontSize: "base"
            })}>
                {props.title}
            </span>
        </div>
    )
}
