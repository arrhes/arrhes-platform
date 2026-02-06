
import { css, cx } from "../../../utilities/cn.js"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentPropsWithRef } from "react"


export function DialogTitle(props:
    ComponentPropsWithRef<typeof DialogPrimitive.Title>
) {
    return (
        <DialogPrimitive.Title
            {...props}
            className={cx(
                css({
                    fontSize: "xl",
                    fontWeight: "semibold"
                }),
                props.className
            )}
        />
    )
}


