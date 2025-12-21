
import { cn } from "#/utilities/cn.js"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentPropsWithRef } from "react"
import { DialogOverlay } from "./dialogOverlay.js"
import { DialogPortal } from "./dialogPortal.js"


export function DialogContent(props:
    ComponentPropsWithRef<typeof DialogPrimitive.Content>
) {
    return (
        <DialogPortal>
            <DialogOverlay>
                <DialogPrimitive.Content
                    {...props}
                    onClick={(e) => e.preventDefault()}
                    className={cn(
                        "min-w-full md:min-w-md w-full max-w-md h-fit max-h-full bg-white rounded-md flex flex-col justify-start items-stretch",
                        // "border border-neutral/20 -outline-offset-0 outline-2 outline-neutral/5 outline-solid",
                        "border border-neutral/10",
                        "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                        props.className
                    )}
                >
                    {props.children}
                </DialogPrimitive.Content>
            </DialogOverlay>
        </DialogPortal>
    )
}