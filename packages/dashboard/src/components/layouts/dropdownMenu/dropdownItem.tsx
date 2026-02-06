import { css } from "../../../utilities/cn.js"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithRef } from "react"


export function DropdownItem(props:
    ComponentPropsWithRef<typeof DropdownMenuItem>
) {
    return (
        <DropdownMenuItem
            {...props}
            className={css({
                w: "full",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                outline: "none"
            })}
        >
            {props.children}
        </DropdownMenuItem>
    )
}