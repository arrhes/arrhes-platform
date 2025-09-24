

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithRef } from "react"
import { cn } from "utilities/cn"


export function DropdownTrigger(props:
    ComponentPropsWithRef<typeof DropdownMenuTrigger>
) {
    return (
        <DropdownMenuTrigger
            {...props}
            className={cn(
                "cursor-pointer w-fit flex justify-start items-center outline-none",
                props.className
            )}
        >
            {props.children}
        </DropdownMenuTrigger>
    )
}