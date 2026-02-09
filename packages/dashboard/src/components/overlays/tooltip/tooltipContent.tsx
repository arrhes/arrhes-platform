
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { ComponentProps } from "react"
import { css, cx } from "../../../utilities/cn.js"


export function TooltipContent(props: ComponentProps<typeof TooltipPrimitive.Content>) {
    return (
        <TooltipPrimitive.Content
            ref={props.ref}
            sideOffset={props.sideOffset}
            className={cx(
                css({
                    zIndex: "50",
                    overflowidth: "auto",
                    maxWidth: "xs",
                    rounded: "md",
                    backgroundColor: "white",
                    px: "4",
                    py: "3",
                    fontSize: "xs",
                    "&[data-state=open]": {
                        animation: "fadeIn 0.2s ease-out, zoomIn 0.2s ease-out"
                    },
                    "&[data-state=closed]": {
                        animation: "fadeOut 0.2s ease-in, zoomOut 0.2s ease-in"
                    }
                }),
                props.className
            )}
            {...props}
        />
    )
}
