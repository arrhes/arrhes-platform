import { css, cx } from "../../../utilities/cn.js"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithRef } from "react"



export function DropdownSeparator(props:
    ComponentPropsWithRef<typeof DropdownMenuSeparator>
) {
    return (
        <DropdownMenuSeparator
            {...props}
            className={cx(
                css({
                    w: "full",
                    h: "1px",
                    bg: "neutral/10",
                    my: "2"
                }),
                props.className
            )}
        />
    )
}