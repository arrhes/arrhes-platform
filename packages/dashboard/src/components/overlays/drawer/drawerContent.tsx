
import { css, cx } from "../../../utilities/cn.js"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentProps } from "react"


export function DrawerContent(props:
    ComponentProps<typeof DialogPrimitive.Content>
) {
    return (
        <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay
                className={css({
                    position: "fixed",
                    zIndex: "10",
                    inset: "0",
                    w: "full",
                    h: "full",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    overflow: "auto",
                    p: "2",
                    bg: "neutral/25",
                    "&[data-state=open]": {
                        animation: "fadeIn 0.2s ease-out"
                    },
                    "&[data-state=closed]": {
                        animation: "fadeOut 0.2s ease-in"
                    }
                })}
            >
                <DialogPrimitive.Content
                    {...props}
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    className={cx(
                        css({
                            minW: "full",
                            w: "full",
                            maxW: "full",
                            h: "full",
                            overflow: "auto",
                            bg: "white",
                            rounded: "md",
                            display: "flex",
                            flexDir: "column",
                            justifyContent: "flex-start",
                            alignItems: "stretch",
                            border: "2px solid",
                            borderColor: "neutral/10",
                            outline: "1px solid",
                            outlineOffset: "-3px",
                            outlineColor: "neutral/50",
                            transitionDuration: "200ms",
                            "&[data-state=open]": {
                                animation: "fadeIn 0.2s ease-out, zoomIn 0.2s ease-out"
                            },
                            "&[data-state=closed]": {
                                animation: "fadeOut 0.2s ease-in, zoomOut 0.2s ease-in"
                            },
                            md: {
                                minW: "md",
                                maxW: "md",
                                maxH: "full"
                            }
                        }),
                        props.className
                    )}
                >
                    {props.children}
                </DialogPrimitive.Content>
            </DialogPrimitive.Overlay>
        </DialogPrimitive.Portal>
    )
}
