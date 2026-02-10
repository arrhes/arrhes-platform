
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentProps } from "react"


export function DrawerTrigger(props:
    ComponentProps<typeof DialogPrimitive.Trigger>
) {
    return (
        <DialogPrimitive.Trigger
            {...props}
            className={props.className}
            asChild
        >
            {props.children}
        </DialogPrimitive.Trigger>
    )
}
