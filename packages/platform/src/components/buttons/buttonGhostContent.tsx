import { CircularLoader } from "#/components/layouts/circularLoader.js"
import { cn } from "#/utilities/cn.js"
import { Icon, IconProps } from "@tabler/icons-react"
import { ComponentProps, ReactElement, cloneElement } from "react"


export type GhostColors = "neutral" | "error" | "warning" | "success" | "information"

export type ButtonGhostContent = {
    isLoading?: boolean
    disabled?: boolean
    text?: string
    title?: string
    icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    color?: GhostColors
    isActive?: boolean
    className?: ComponentProps<'div'>['className']
}

const variants = {
    "neutral": {
        container: "hover:bg-neutral/5 hover:border-neutral/5",
        loader: "stroke-neutral",
        icon: "stroke-neutral",
        text: "text-neutral"
    },
    "error": {
        container: "hover:bg-error/5 hover:border-error/5",
        loader: "stroke-error",
        icon: "stroke-error",
        text: "text-error"
    },
    "warning": {
        container: "hover:bg-warning/5 hover:border-warning/5",
        loader: "stroke-warning",
        icon: "stroke-warning",
        text: "text-warning"
    },
    "success": {
        container: "hover:bg-success/5 hover:border-success/5",
        loader: "stroke-success",
        icon: "stroke-success",
        text: "text-success"
    },
    "information": {
        container: "hover:bg-information/5 hover:border-information/5",
        loader: "stroke-information",
        icon: "stroke-information",
        text: "text-information"
    }
}

export function ButtonGhostContent(props: ButtonGhostContent) {
    return (
        <div
            title={props.title ?? props.text}
            aria-disabled={props.disabled || props.isLoading}
            className={cn(
                "w-fit h-[32px] flex justify-start items-center gap-2 p-2 rounded-sm border border-transparent",
                "cursor-pointer disabled:cursor-not-allowed",
                variants[props?.color ?? "neutral"].container,
                props.className
            )}
        >
            {
                (!props.isLoading)
                    ? null
                    : (
                        <CircularLoader
                            className={cn(
                                "min-w-[16px] w-[16px] min-h-[16px] h-[16px]",
                                variants[props?.color ?? "neutral"].loader
                            )}
                        />
                    )
            }
            {
                (props.icon && !props.isLoading)
                    ? cloneElement(props.icon, {
                        "aria-disabled": props.disabled,
                        size: 16,
                        className: cn(
                            "min-w-[16px] w-[16px] min-h-[16px] h-[16px]",
                            variants[props?.color ?? "neutral"].icon
                        ),
                        strokeWidth: 1
                    })
                    : null
            }
            {
                (props.text === undefined)
                    ? null
                    : (
                        <span
                            aria-disabled={props.disabled || props.isLoading}
                            className={cn(
                                "text-[12px] leading-[16px] overflow-x-hidden text-ellipsis whitespace-nowrap",
                                props.isActive ? "font-bold" : "",
                                variants[props?.color ?? "neutral"].text
                            )}
                        >
                            {props.text}
                        </span>
                    )
            }
        </div>
    )
}
