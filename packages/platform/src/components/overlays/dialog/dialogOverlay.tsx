
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentPropsWithRef } from "react"
import { cn } from "utilities/cn"



export function DialogOverlay(props:
    ComponentPropsWithRef<typeof DialogPrimitive.Overlay>
) {
    return (
        <DialogPrimitive.Overlay
            {...props}
            // style={{ zIndex: 100 }}
            className={cn(
                "fixed z-10 inset-0 w-full h-full flex flex-col justify-center items-center p-6 bg-neutral/20",
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                props.className
            )}
        />
    )
}