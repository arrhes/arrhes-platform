import { cn } from "#/utilities/cn.js"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { IconAlertTriangle, IconCircleCheck, IconInfoSquare } from "@tabler/icons-react"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"


const toastIcons = {
    error: (
        <div className="p-2 w-[32px] h-[32px] flex justify-center items-center rounded-sm bg-error/10 border border-error/50">
            <IconAlertTriangle size={16} className="text-error" />
        </div>
    ),
    success: (
        <div className="p-2 w-[32px] h-[32px] flex justify-center items-center rounded-sm bg-success/10 border border-success">
            <IconCircleCheck size={16} className="text-success" />
        </div>
    ),
    warning: (
        <div className="p-2 w-[32px] h-[32px] flex justify-center items-center rounded-sm bg-warning/10 border border-warning">
            <IconAlertTriangle size={16} className="text-warning" />
        </div>
    ),
    information: (
        <div className="p-2 w-[32px] h-[32px] flex justify-center items-center rounded-sm bg-information/10 border border-information">
            <IconInfoSquare size={16} className="text-information" />
        </div>
    )
}
const toastVariants = cva(
    cn(
        "group pointer-events-auto relative w-full flex items-center justify-start space-x-4 border p-2 rounded-md border border-neutral/10 bg-white",
        "transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-left-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
        "bg-white"
    ),
    {
        variants: {
            variant: {
                error: "text-error",
                success: "text-success",
                warning: "text-warning ",
                information: "text-information"
            },
        },
        defaultVariants: {
            variant: "information",
        },
    }
)

type ToastContent = ComponentProps<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>

export function ToastContent(props: ToastContent) {
    return (
        <ToastPrimitives.Root
            {...props}
            className={cn(
                toastVariants({ variant: props.variant }),
                props.className
            )}
        >
            {toastIcons[props.variant ?? "information"]}
            {props.children}
        </ToastPrimitives.Root>
    )
}