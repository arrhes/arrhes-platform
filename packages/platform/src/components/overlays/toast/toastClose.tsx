import * as ToastPrimitives from "@radix-ui/react-toast"
import { IconX } from "@tabler/icons-react"
import { ButtonGhost } from "components/buttons/buttonGhost"
import { ComponentProps } from "react"
import { cn } from "utilities/cn"


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
