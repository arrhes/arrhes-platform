import { css, cx } from "../../../utilities/cn.js"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { ComponentProps } from "react"


export function ToastAction(props:
    ComponentProps<typeof ToastPrimitives.Action>
) {
    return (
        <ToastPrimitives.Action
            {...props}
            className={cx(
                css({
                    display: "inline-flex",
                    h: "8",
                    flexShrink: "0",
                    alignItems: "center",
                    justifyContent: "center",
                    rounded: "md",
                    border: "1px solid",
                    bg: "transparent",
                    px: "3",
                    fontSize: "sm",
                    fontWeight: "medium",
                    transition: "colors",
                    _hover: { bg: "secondary" },
                    _focus: { outline: "none", ring: "1", ringColor: "ring" },
                    _disabled: { pointerEvents: "none", opacity: "0.5" }
                }),
                props.className
            )}
        />
    )
}