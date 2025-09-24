import { Icon, IconProps } from "@tabler/icons-react"
import { CircularLoader } from "components/layouts/circularLoader"
import { cloneElement, ComponentProps, ReactElement } from "react"
import { cn } from "utilities/cn"


export type OutlineColors = "neutral" | "error" | "warning" | "success" | "information"

export type ButtonOutlineContent = {
    isLoading?: boolean
    disabled?: boolean
    text?: string
    title?: string
    icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    rightIcon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    color?: OutlineColors
    className?: ComponentProps<'div'>['className']
}

const variants = {
    "neutral": {
        container: "border-neutral/25 hover:bg-neutral/5 group-focus:bg-neutral/5 bg-background",
        loader: "stroke-neutral",
        icon: "stroke-neutral",
        rightIcon: "stroke-neutral/50",
        text: "text-neutral/75",
    },
    "error": {
        container: "border-error/50 hover:bg-error/5 group-focus:bg-error/5",
        loader: "stroke-error",
        icon: "stroke-error",
        rightIcon: "stroke-error/50",
        text: "text-error",
    },
    "warning": {
        container: "border-warning/50 hover:bg-warning/5 group-focus:bg-warning/5",
        loader: "stroke-warning",
        icon: "stroke-warning",
        rightIcon: "stroke-warning/50",
        text: "text-warning",
    },
    "success": {
        container: "border-success/50 hover:bg-success/5 group-focus:bg-success/5",
        loader: "stroke-success",
        icon: "stroke-success",
        rightIcon: "stroke-success/50",
        text: "text-success",
    },
    "information": {
        container: "border-information/50 hover:bg-information/5 group-focus:bg-information/5",
        loader: "stroke-information",
        icon: "stroke-information",
        rightIcon: "stroke-information/50",
        text: "text-information",
    },
}

export function ButtonOutlineContent(props: ButtonOutlineContent) {
    return (
        <div
            title={props.title ?? props.text}
            aria-disabled={props.disabled || props.isLoading}
            className={cn(
                "w-fit h-[32px] p-2 flex justify-center items-center gap-2 rounded-sm border box-border",
                "aria-disabled:opacity-30",
                "cursor-pointer disabled:cursor-not-allowed",
                (props.text === undefined) ? "w-[32px]" : "",
                variants[props?.color ?? "neutral"].container,
                props.className
            )}
        >
            {
                (props.icon === undefined)
                    ? (null)
                    : cloneElement(props.icon, {
                        "aria-disabled": props.disabled,
                        size: 16,
                        className: cn(
                            "min-w-[16px] w-[16px] min-h-[16px] h-[16px] text-white aria-disabled:text-neutral/50",
                            variants[props?.color ?? "neutral"].icon
                        ),
                        strokeWidth: 1
                    })
            }
            {
                (props.text === undefined)
                    ? null
                    : (
                        <span
                            aria-disabled={props.disabled || props.isLoading}
                            className={cn(
                                "text-sm leading-[16px] font-medium aria-disabled:text-neutral/50 overflow-hidden text-ellipsis whitespace-nowrap",
                                variants[props?.color ?? "neutral"].text
                            )}
                        >
                            {props.text}
                        </span>
                    )
            }
            {
                (props.rightIcon === undefined)
                    ? (null)
                    : (
                        <div className="ml-2 flex items-center justify-center">
                            {(props.isLoading === true)
                                ? (
                                    <CircularLoader
                                        size={12}
                                        className={cn(
                                            "min-w-[12px] w-[12px] min-h-[12px] h-[12px]",
                                            variants[props?.color ?? "neutral"].loader,
                                        )}
                                    />
                                )
                                : (
                                    cloneElement(props.rightIcon, {
                                        "aria-disabled": props.disabled,
                                        size: 12,
                                        className: cn(
                                            "min-w-[8px] w-[12px] min-h-[8px] h-[12px] text-white aria-disabled:text-neutral/50",
                                            variants[props?.color ?? "neutral"].rightIcon
                                        ),
                                        strokeWidth: 1
                                    })
                                )
                            }
                        </div>
                    )
            }
        </div>
    )
}
