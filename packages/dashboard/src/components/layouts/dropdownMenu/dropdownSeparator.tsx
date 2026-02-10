import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithRef } from "react"
import { css, cx } from "../../../utilities/cn.js"



export function DropdownSeparator(props:
    ComponentPropsWithRef<typeof DropdownMenuSeparator>
) {
    return (
        <DropdownMenuSeparator
            {...props}
            className={cx(
                css({
                    width: "100%",
                    height: "1px",
                    backgroundColor: "neutral/10",
                }),
                props.className
            )}
        />
    )
}