import { css, cx } from "../../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


type PageContent = {
    className?: ComponentProps<'div'>['className']
    children: ReactElement | ReactElement[]
}

export function PageContent(props: PageContent) {
    return (
        <div
            className={cx(
                css({
                    w: "full",
                    maxW: "xl",
                    h: "fit",
                    display: "flex",
                    flexDir: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "4"
                }),
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
