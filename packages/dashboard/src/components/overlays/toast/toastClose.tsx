import { ButtonGhost } from "#/components/buttons/buttonGhost.js"
import { cn } from "#/utilities/cn.js"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { IconX } from "@tabler/icons-react"
import { ComponentProps } from "react"


type ToastClose = ComponentProps<typeof ToastPrimitives.Close>

export function ToastClose(props: ToastClose) {
    return (
        <ToastPrimitives.Close
            {...props}
            className={cn(
                "ml-auto opacity-0",
                "transition-opacity focus:opacity-100 group-hover:opacity-100",
                props.className
            )}
            toast-close=""
            asChild
        >
            <ButtonGhost
                icon={<IconX />}
            />
        </ToastPrimitives.Close>
    )
}
