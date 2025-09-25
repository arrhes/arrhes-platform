
import { ButtonGhost } from "#/components/buttons/buttonGhost.js"
import { cn } from "#/utilities/cn.js"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { IconX } from "@tabler/icons-react"
import { HTMLAttributes } from "react"


export function DialogHeader(props:
    HTMLAttributes<HTMLDivElement>
) {
    return (
        <div
            {...props}
            className={cn(
                "w-full flex justify-between items-center p-4",
                props.className
            )}
        >
            <div className="flex justify-start items-start">
                {props.children}
            </div>
            <DialogPrimitive.Close asChild>
                <ButtonGhost
                    icon={<IconX />}
                />
            </DialogPrimitive.Close>
        </div>
    )
}