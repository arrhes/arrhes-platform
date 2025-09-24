import * as ToastPrimitives from "@radix-ui/react-toast"
import { ComponentProps } from "react"
import { cn } from "utilities/cn"


type ToastDescription = ComponentProps<typeof ToastPrimitives.Description>

export function ToastDescription(props: ToastDescription) {
    return (
        <ToastPrimitives.Description
            {...props}
            className={cn(
                "text-sm text-neutral/50",
                props.className
            )}
        />
    )
}