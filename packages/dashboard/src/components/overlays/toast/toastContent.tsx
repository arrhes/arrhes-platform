import { css, cx } from "../../../utilities/cn.js"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { IconAlertTriangle, IconCircleCheck, IconInfoSquare } from "@tabler/icons-react"
import { ComponentProps } from "react"


const toastIcons = {
    error: (
        <div className={css({
            p: "2",
            w: "32px",
            h: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            rounded: "sm",
            bg: "error/10",
            border: "1px solid",
            borderColor: "error/50"
        })}>
            <IconAlertTriangle size={16} className={css({ color: "error" })} />
        </div>
    ),
    success: (
        <div className={css({
            p: "2",
            w: "32px",
            h: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            rounded: "sm",
            bg: "success/10",
            border: "1px solid",
            borderColor: "success"
        })}>
            <IconCircleCheck size={16} className={css({ color: "success" })} />
        </div>
    ),
    warning: (
        <div className={css({
            p: "2",
            w: "32px",
            h: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            rounded: "sm",
            bg: "warning/10",
            border: "1px solid",
            borderColor: "warning"
        })}>
            <IconAlertTriangle size={16} className={css({ color: "warning" })} />
        </div>
    ),
    information: (
        <div className={css({
            p: "2",
            w: "32px",
            h: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            rounded: "sm",
            bg: "information/10",
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
                    w: "full",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "4",
                    p: "2",
                    rounded: "md",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    bg: "white",
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