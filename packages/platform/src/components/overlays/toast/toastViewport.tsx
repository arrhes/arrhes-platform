import * as ToastPrimitives from "@radix-ui/react-toast"
import { ComponentProps } from "react"
import { cn } from "utilities/cn"


type ToastViewport = ComponentProps<typeof ToastPrimitives.Viewport>

export function ToastViewport(props: ToastViewport) {
    return (
        <ToastPrimitives.Viewport
            {...props}
            className={cn(
                "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-1 p-4 md:bottom-0 right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
                props.className
            )}
        />
    )
}