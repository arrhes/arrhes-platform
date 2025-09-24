
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { IconX } from "@tabler/icons-react"
import { ButtonGhost } from "components/buttons/buttonGhost"
import { HTMLAttributes } from "react"
import { cn } from "utilities/cn"


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