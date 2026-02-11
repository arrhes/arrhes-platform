
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentPropsWithRef } from "react"
import { css, cx } from "../../../utilities/cn.js"


export function DialogTitle(props:
    ComponentPropsWithRef<typeof DialogPrimitive.Title>
) {
    return (
        <DialogPrimitive.Title
            {...props}
            className={cx(
                css({
                    fontSize: "lg",
                    fontWeight: "semibold"
                }),
                props.className
            )}
        />
    )
}


