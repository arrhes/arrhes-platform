import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithRef } from "react"
import { css } from "../../../utilities/cn.js"


export function DropdownItem(props:
    ComponentPropsWithRef<typeof DropdownMenuItem>
) {
    return (
        <DropdownMenuItem
            {...props}
            className={css({
                width: "100%",
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