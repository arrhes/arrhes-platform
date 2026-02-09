
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentPropsWithRef } from "react"
import { css, cx } from "../../../utilities/cn.js"



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
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "6",
                    backgroundColor: "neutral/20",
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