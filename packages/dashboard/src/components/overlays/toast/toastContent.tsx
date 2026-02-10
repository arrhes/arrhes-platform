import * as ToastPrimitives from "@radix-ui/react-toast"
import { IconAlertTriangle, IconCircleCheck, IconInfoSquare } from "@tabler/icons-react"
import { ComponentProps } from "react"
import { css, cx } from "../../../utilities/cn.js"


const toastIcons = {
    error: (
        <div className={css({
            padding: "1rem",
            width: "32px",
            height: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "sm",
            backgroundColor: "error/10",
            border: "1px solid",
            borderColor: "error/50"
        })}>
            <IconAlertTriangle size={16} className={css({ color: "error" })} />
        </div>
    ),
    success: (
        <div className={css({
            padding: "1rem",
            width: "32px",
            height: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "sm",
            backgroundColor: "success/10",
            border: "1px solid",
            borderColor: "success"
        })}>
            <IconCircleCheck size={16} className={css({ color: "success" })} />
        </div>
    ),
    warning: (
        <div className={css({
            padding: "1rem",
            width: "32px",
            height: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "sm",
            backgroundColor: "warning/10",
            border: "1px solid",
            borderColor: "warning"
        })}>
            <IconAlertTriangle size={16} className={css({ color: "warning" })} />
        </div>
    ),
    information: (
        <div className={css({
            padding: "1rem",
            width: "32px",
            height: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "sm",
            backgroundColor: "information/10",
            border: "1px solid",
            borderColor: "information"
        })}>
            <IconInfoSquare size={16} className={css({ color: "information" })} />
        </div>
    )
}

const variantStyles = {
    error: css({ color: "error" }),
    success: css({ color: "success" }),
    warning: css({ color: "warning" }),
    information: css({ color: "information" })
}

type ToastContent = ComponentProps<typeof ToastPrimitives.Root> & {
    variant?: "error" | "success" | "warning" | "information"
}

export function ToastContent(props: ToastContent) {
    return (
        <ToastPrimitives.Root
            {...props}
            className={cx(
                css({
                    pointerEvents: "auto",
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "4",
                    padding: "1rem",
                    borderRadius: "md",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    backgroundColor: "white",
                    transition: "all",
                    "&[data-swipe=cancel]": { transform: "translateX(0)" },
                    "&[data-swipe=end]": { transform: "translateX(var(--radix-toast-swipe-end-x))" },
                    "&[data-swipe=move]": {
                        transform: "translateX(var(--radix-toast-swipe-move-x))",
                        transition: "none"
                    },
                    "&[data-state=open]": {
                        animation: "slideInFromBottom 0.2s ease-out"
                    },
                    "&[data-state=closed]": {
                        animation: "fadeOut 0.2s ease-in"
                    }
                }),
                variantStyles[props.variant ?? "information"],
                props.className
            )}
        >
            {toastIcons[props.variant ?? "information"]}
            {props.children}
        </ToastPrimitives.Root>
    )
}