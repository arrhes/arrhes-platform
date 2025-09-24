import * as PopoverPrimitive from "@radix-ui/react-popover"
import { ComponentProps } from "react"
import { cn } from "utilities/cn"


type PopoverContent = ComponentProps<typeof PopoverPrimitive.Content>

export function PopoverContent(props: PopoverContent) {
    return (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
                {...props}
                align={props.align || "start"}
                alignOffset={props.alignOffset || 0}
                side={props.side || "bottom"}
                sideOffset={props.sideOffset || 4}
                className={cn(
                    "z-10 bg-white rounded-md shadow-md flex flex-col justify-start items-stretch gap-0",
                    "min-w-[var(--radix-popover-trigger-width)] max-w-[var(--radix-popover-trigger-width)]",
                    "border border-neutral/10",
                    // "border border-neutral/20 -outline-offset-0 outline-2 outline-neutral/5 outline-solid",
                    props.className
                )}
            // className={cn(
            //     "z-10 h-fit bg-white shadow-lg outline-none rounded-lg",
            //     "min-w-[var(--radix-popover-trigger-width)] max-w-[100dvw]",
            //     // "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            //     props.className
            // )}
            />
        </PopoverPrimitive.Portal>
    )
}
