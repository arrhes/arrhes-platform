import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithRef } from "react"


export function DropdownItem(props:
    ComponentPropsWithRef<typeof DropdownMenuItem>
) {
    return (
        <DropdownMenuItem
            {...props}
            className="w-full flex justify-start items-center outline-none"
        >
            {props.children}
        </DropdownMenuItem>
    )
}