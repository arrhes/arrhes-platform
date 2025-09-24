
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentProps } from "react"
import { cn } from "utilities/cn"


export function DrawerContent(props:
    ComponentProps<typeof DialogPrimitive.Content>
) {
    return (
        <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay
                className={cn(
                    "fixed z-10 inset-0 w-full h-full flex justify-end items-center overflow-auto p-2 bg-neutral/25",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                )}
            >
                <DialogPrimitive.Content
                    {...props}
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    className={cn(
                        "min-w-full md:min-w-md w-full max-w-full md:max-w-md h-full md:max-h-full overflow-auto bg-white rounded-md",
                        "flex flex-col justify-start items-stretch",
                        "border-solid border-2 border-neutral/10",
                        "outline-solid outline-1 outline-offset-[-3px] outline-neutral/50",
                        "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                        props.className
                    )}
                // onInteractOutside={e => e.preventDefault()}
                // onPointerDownOutside={e => e.preventDefault()}
                >
                    {props.children}
                </DialogPrimitive.Content>
            </DialogPrimitive.Overlay>
        </DialogPrimitive.Portal>
    )
}
