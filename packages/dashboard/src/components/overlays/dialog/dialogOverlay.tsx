
import { css, cx } from "../../../utilities/cn.js"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentPropsWithRef } from "react"



export function DialogOverlay(props:
    ComponentPropsWithRef<typeof DialogPrimitive.Overlay>
) {
    return (
        <DialogPrimitive.Overlay
            {...props}
            // style={{ zIndex: 100 }}
            className={cx(
                css({
                    position: "fixed",
                    zIndex: "10",
                    inset: "0",
                    w: "full",
                    h: "full",
                    display: "flex",
                    flexDir: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "6",
                    bg: "neutral/20",
                    "&[data-state=open]": {
                        animation: "fadeIn 0.2s ease-out"
                    },
                    "&[data-state=closed]": {
                        animation: "fadeOut 0.2s ease-in"
                    }
                }),
                props.className
            )}
        />
    )
}