import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../../utilities/cn.js"


export function SectionRoot(props: {
    children: null | ReactElement | (null | ReactElement)[]
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cx(
                css({
                    flexGrowidth: "1",
                    minwidth: "0",
                    width: "100%",
                    maxWidth: "100%",
                    height: "fit",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "8"
                }),
                props.className
            )}
            children={props.children}
        />
    )
}
