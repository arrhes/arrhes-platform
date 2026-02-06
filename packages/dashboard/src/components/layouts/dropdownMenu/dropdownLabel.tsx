import { css } from "../../../utilities/cn.js"
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithRef } from "react"


export function DropdownLabel(props:
    ComponentPropsWithRef<typeof DropdownMenuLabel>
) {
    return (
        <DropdownMenuLabel
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
        </DropdownMenuLabel>
    )
}