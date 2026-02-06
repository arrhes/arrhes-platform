import { css, cx } from "../../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


type CardRoot = {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'div'>['className']
}

export function CardRoot(props: CardRoot) {
    return (
        <div
            className={cx(
                css({
                    w: "full",
                    flexShrink: "0",
                    flex: "1",
                    display: "flex",
                    flexDir: "column",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    overflow: "auto",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    rounded: "md"
                }),
                props.className
            )}
            children={props.children}
        />
    )
}
