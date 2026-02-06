
import { css, cx } from "../../../utilities/cn.js"
import { HTMLAttributes } from "react"


export function DialogFooter(props:
    HTMLAttributes<HTMLDivElement>
) {
    return (
        <div
            {...props}
            className={cx(
                css({
                    p: "4",
                    borderTop: "1px solid",
                    borderColor: "neutral/10",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "2"
                }),
                props.className
            )}
        />
    )
}