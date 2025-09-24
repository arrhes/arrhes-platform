import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithRef } from "react"


export function DropdownLabel(props:
    ComponentPropsWithRef<typeof DropdownMenuLabel>
) {
    return (
        <DropdownMenuLabel
            {...props}
            className="w-full flex justify-start items-center outline-none"
        >
            {props.children}
        </DropdownMenuLabel>
    )
}