import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithRef } from "react"


export function DropdownRoot(props:
    ComponentPropsWithRef<typeof DropdownMenu>
) {
    return (
        <DropdownMenu
            {...props}
            modal={false}
        >
            {props.children}
        </DropdownMenu>
    )
}