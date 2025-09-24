
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentProps } from "react"


export function DrawerRoot(props:
    ComponentProps<typeof DialogPrimitive.Root>
) {
    return (
        <DialogPrimitive.Root
            {...props}
            modal={true}
        >
            {props.children}
        </DialogPrimitive.Root>
    )
}
