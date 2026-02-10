import * as ToastPrimitives from "@radix-ui/react-toast"
import { ComponentProps } from "react"
import { css, cx } from "../../../utilities/cn.js"


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
                    width: "100%",
                    flexDirection: "column-reverse",
                    gap: "1",
                    padding: "4",
                    right: "0",
                    sm: {
                        top: "auto",
                        flexDirection: "column"
                    },
                    md: {
                        bottom: "0",
                        maxWidth: "420px"
                    }
                }),
                props.className
            )}
        />
    )
}