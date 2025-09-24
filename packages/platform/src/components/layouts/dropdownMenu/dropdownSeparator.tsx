import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithRef } from "react"
import { cn } from "utilities/cn"



export function DropdownSeparator(props:
    ComponentPropsWithRef<typeof DropdownMenuSeparator>
) {
    return (
        <DropdownMenuSeparator
            {...props}
            className={cn(
                "w-full h-[1px] bg-neutral/10 my-2",
                props.className
            )}
        />
    )
}