
import { cn } from "#/utilities/cn.js"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentPropsWithRef } from "react"


export function DialogTitle(props:
    ComponentPropsWithRef<typeof DialogPrimitive.Title>
) {
    return (
        <DialogPrimitive.Title
            {...props}
            className={cn(
                "text-xl font-semibold",
                props.className
            )}
        />
    )
}

