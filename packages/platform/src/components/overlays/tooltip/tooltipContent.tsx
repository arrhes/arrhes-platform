
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { ComponentProps } from "react"
import { cn } from "utilities/cn"


export function TooltipContent(props: ComponentProps<typeof TooltipPrimitive.Content>) {
    return (
        <TooltipPrimitive.Content
            ref={props.ref}
            sideOffset={props.sideOffset}
            className={cn(
                "z-50 overflow-auto max-w-xs rounded-md bg-white px-4 py-3 text-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                props.className
            )}
            {...props}
        />
    )
}
