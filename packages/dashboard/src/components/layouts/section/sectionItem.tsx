import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../../utilities/cn.js"


export function SectionItem(props: {
    children: null | ReactElement | (null | ReactElement)[]
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cx(
                css({
                    flexGrow: "1",
                    minWidth: "0",
                    width: "100%",
                    maxWidth: "100%",
                    height: "fit",
                    display: "flex",
                    flexDirection: "column",
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
