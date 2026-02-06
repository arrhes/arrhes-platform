
import { css, cx } from "../../../utilities/cn.js"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentProps } from "react"


export function DrawerTrigger(props:
    ComponentProps<typeof DialogPrimitive.Trigger>
) {
    return (
        <DialogPrimitive.Trigger
            {...props}
            className={cx(
                css({ cursor: "pointer" }),
                props.className
            )}
        >
            {props.children}
        </DialogPrimitive.Trigger>
    )
}
