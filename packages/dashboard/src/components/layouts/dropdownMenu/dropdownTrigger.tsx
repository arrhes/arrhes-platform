

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithRef } from "react"
import { css, cx } from "../../../utilities/cn.js"


export function DropdownTrigger(props:
    ComponentPropsWithRef<typeof DropdownMenuTrigger>
) {
    return (
        <DropdownMenuTrigger
            {...props}
            className={cx(
                css({
                    cursor: "pointer",
                    width: "fit",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    outline: "none"
                }),
                props.className
            )}
        >
            {props.children}
        </DropdownMenuTrigger>
    )
}