import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithRef } from "react"
import { css } from "../../../utilities/cn.js"


export function DropdownLabel(props:
    ComponentPropsWithRef<typeof DropdownMenuLabel>
) {
    return (
        <DropdownMenuLabel
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
        </DropdownMenuLabel>
    )
}