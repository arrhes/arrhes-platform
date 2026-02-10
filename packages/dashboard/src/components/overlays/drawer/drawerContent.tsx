
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
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    padding: "1rem",
                    backgroundColor: "neutral/10",
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
                    onClick={(e) => e.preventDefault()}
                    className={cx(
                        css({
                            minWidth: "100%",
                            width: "100%",
                            maxWidth: "100%",
                            height: "100%",
                            overflowY: "auto",
                            backgroundColor: "white",
                            borderRadius: "md",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "stretch",
                            border: "1px solid",
                            borderColor: "neutral/10",
                            transitionDuration: "200ms",
                            "&[data-state=open]": {
                                animation: "fadeIn 0.2s ease-out, zoomIn 0.2s ease-out"
                            },
                            "&[data-state=closed]": {
                                animation: "fadeOut 0.2s ease-in, zoomOut 0.2s ease-in"
                            },
                            md: {
                                minWidth: "md",
                                maxWidth: "md",
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
