
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentPropsWithRef } from "react"
import { cn } from "utilities/cn"


export function DialogDescription(props:
    ComponentPropsWithRef<typeof DialogPrimitive.Description>
) {
    return (
        <DialogPrimitive.Description
            {...props}
            className={cn(
                "text-sm text-neutral/50",
                props.className
            )}
        />
    )
}
