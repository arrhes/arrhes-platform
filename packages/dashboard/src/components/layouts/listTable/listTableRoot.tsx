import { ComponentProps, JSX } from "react"
import { css, cx } from "../../../utilities/cn.js"


export function ListTableRoot(props: {
    children: JSX.Element | JSX.Element[]
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    borderRadius: "lg",
                }),
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
