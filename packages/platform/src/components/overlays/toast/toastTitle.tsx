import * as ToastPrimitives from "@radix-ui/react-toast"
import { ComponentProps } from "react"
import { cn } from "utilities/cn"



export function ToastTitle(props:
    ComponentProps<typeof ToastPrimitives.Title>
) {
    return (
        <ToastPrimitives.Title
            {...props}
            className={cn(
                "text-base [&+div]:text-xs text-neutral/75 font-semibold",
                props.className
            )}
        />
    )
}

