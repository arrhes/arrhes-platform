import { cn } from "#/utilities/cn.js"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { ComponentProps } from "react"



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

