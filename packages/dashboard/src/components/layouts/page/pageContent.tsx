import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../../utilities/cn.js"


type PageContent = {
    className?: ComponentProps<'div'>['className']
    children: ReactElement | ReactElement[]
}

export function PageContent(props: PageContent) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    maxWidth: "xl",
                    height: "fit",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "1rem"
                }),
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
