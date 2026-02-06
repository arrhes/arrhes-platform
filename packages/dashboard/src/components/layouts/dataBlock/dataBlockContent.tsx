import { css, cx } from "../../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function DataBlockContent(props: {
    children: null | ReactElement | (null | ReactElement)[]
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cx(
                css({
                    flexShrink: "0",
                    w: "full",
                    h: "fit",
                    display: "grid",
                    gridTemplateColumns: "max-content auto",
                    columnGap: "4",
                    rowGap: "2",
                    p: "4",
                    border: "1px solid",
                    borderColor: "neutral/20",
                    rounded: "md"
                }),
                props.className
            )}
            children={props.children}
        />
    )
}
