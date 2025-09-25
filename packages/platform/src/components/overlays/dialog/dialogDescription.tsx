
import { cn } from "#/utilities/cn.js"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentPropsWithRef } from "react"


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
