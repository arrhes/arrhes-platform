import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function PageContent(props: {
    className?: ComponentProps<"div">["className"]
    children: ReactElement | ReactElement[]
}) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    maxWidth: "xl",
                    height: "fit",
                    paddingY: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "1rem",
                }),
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
