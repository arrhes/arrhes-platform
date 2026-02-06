import { css, cx } from "../../../utilities/cn.js"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { ComponentProps } from "react"



export function ToastTitle(props:
    ComponentProps<typeof ToastPrimitives.Title>
) {
    return (
        <ToastPrimitives.Title
            {...props}
            className={cx(
                css({
                    fontSize: "base",
                    color: "neutral/75",
                    fontWeight: "semibold",
                    "& + div": { fontSize: "xs" }
                }),
                props.className
            )}
        />
    )
}


