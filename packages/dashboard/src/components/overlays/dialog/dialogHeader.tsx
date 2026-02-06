
import { Button } from "@arrhes/ui"
import { css, cx } from "../../../utilities/cn.js"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { IconX } from "@tabler/icons-react"
import { HTMLAttributes } from "react"


export function DialogHeader(props:
    HTMLAttributes<HTMLDivElement>
) {
    return (
        <div
            {...props}
            className={cx(
                css({
                    w: "full",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: "4"
                }),
                props.className
            )}
        >
            <div className={css({
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start"
            })}>
                {props.children}
            </div>
            <DialogPrimitive.Close asChild>
                <Button
                    variant="invisible"
                    icon={<IconX />}
                />
            </DialogPrimitive.Close>
        </div>
    )
}