import { cn } from "#/utilities/cn.js"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { ComponentProps } from "react"


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