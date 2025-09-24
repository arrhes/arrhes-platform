
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentProps } from "react"
import { cn } from "utilities/cn"


export function DrawerTrigger(props:
    ComponentProps<typeof DialogPrimitive.Trigger>
) {
    return (
        <DialogPrimitive.Trigger
            {...props}
            className={cn(
                "cursor-pointer group",
                props.className
            )}
        >
            {props.children}
        </DialogPrimitive.Trigger>
    )
}
