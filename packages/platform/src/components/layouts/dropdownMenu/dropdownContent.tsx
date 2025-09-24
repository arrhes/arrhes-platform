import { DropdownMenuContent, DropdownMenuPortal } from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithRef } from "react"
import { cn } from "utilities/cn"



export function DropdownContent(props:
    ComponentPropsWithRef<typeof DropdownMenuContent>
) {
    return (
        <DropdownMenuPortal>
            <DropdownMenuContent
                {...props}
                align={props.align || "start"}
                alignOffset={props.alignOffset || 0}
                side={props.side || "bottom"}
                sideOffset={props.sideOffset || 6}
                className={cn(
                    "bg-white rounded-md p-2 shadow-lg flex flex-col justify-start items-stretch gap-0",
                    "border border-neutral/20",
                    "min-w-[var(--radix-dropdown-menu-trigger-width)]",
                    props.className
                )}
            >
                {props.children}
            </DropdownMenuContent>
        </DropdownMenuPortal>
    )
}