import { css, cx } from "../../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function SectionItem(props: {
    children: null | ReactElement | (null | ReactElement)[]
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cx(
                css({
                    flexGrow: "1",
                    minW: "0",
                    w: "full",
                    maxW: "full",
                    h: "fit",
                    display: "flex",
                    flexDir: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "4"
                }),
                props.className
            )}
            children={props.children}
        />
    )
}
