import { css, cx } from "../../../utilities/cn.js"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { ComponentProps } from "react"


type ToastViewport = ComponentProps<typeof ToastPrimitives.Viewport>

export function ToastViewport(props: ToastViewport) {
    return (
        <ToastPrimitives.Viewport
            {...props}
            className={cx(
                css({
                    position: "fixed",
                    top: "0",
                    zIndex: "100",
                    display: "flex",
                    maxH: "screen",
                    w: "full",
                    flexDir: "column-reverse",
                    gap: "1",
                    p: "4",
                    right: "0",
                    sm: {
                        top: "auto",
                        flexDir: "column"
                    },
                    md: {
                        bottom: "0",
                        maxW: "420px"
                    }
                }),
                props.className
            )}
        />
    )
}