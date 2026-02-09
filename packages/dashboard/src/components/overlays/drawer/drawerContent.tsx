
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentProps } from "react"
import { css, cx } from "../../../utilities/cn.js"


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
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    overflowidth: "auto",
                    p: "2",
                    backgroundColor: "neutral/25",
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
                            minwidth: "100%",
                            width: "100%",
                            maxWidth: "100%",
                            height: "100%",
                            overflowidth: "auto",
                            backgroundColor: "white",
                            rounded: "md",
                            display: "flex",
                            flexDirection: "column",
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
                                minwidth: "md",
                                maxWidth: "md",
                                maxH: "100%"
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
