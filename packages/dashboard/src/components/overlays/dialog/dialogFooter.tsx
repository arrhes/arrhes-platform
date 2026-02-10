
import { HTMLAttributes } from "react"
import { css, cx } from "../../../utilities/cn.js"


export function DialogFooter(props:
    HTMLAttributes<HTMLDivElement>
) {
    return (
        <div
            {...props}
            className={cx(
                css({
                    padding: "4",
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