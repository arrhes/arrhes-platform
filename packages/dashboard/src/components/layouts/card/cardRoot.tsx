import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../../utilities/cn.js"


type CardRoot = {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'div'>['className']
}

export function CardRoot(props: CardRoot) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    flexShrink: "0",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    overflowY: "auto",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    borderRadius: "md"
                }),
                props.className
            )}
            children={props.children}
        />
    )
}
