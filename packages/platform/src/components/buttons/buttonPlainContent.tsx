import { Icon, IconLoader2, IconProps } from "@tabler/icons-react"
import { ComponentProps, ReactElement, cloneElement } from "react"
import { cn } from "utilities/cn"


export type PlainColors = "neutral" | "error" | "warning" | "success" | "information"

export type ButtonPlainContent = {
    isLoading?: boolean
    disabled?: boolean
    text?: string
    title?: string
    icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    color?: PlainColors
    className?: ComponentProps<'div'>['className']
}

const variants = {
    "neutral": {
        container: "bg-neutral border-neutral"
    },
    "error": {
        container: "bg-error border-error"
    },
    "warning": {
        container: "bg-warning border-warning"
    },
    "success": {
        container: "bg-success border-success"
    },
    "information": {
        container: "bg-information border-information"
    },
}

export function ButtonPlainContent(props: ButtonPlainContent) {
    return (
        <div
            title={props.title ?? props.text}
            aria-disabled={props.disabled || props.isLoading}
            className={cn(
                "w-fit h-[32px] flex justify-start items-center gap-2 p-2 rounded-sm border",
                "cursor-pointer disabled:cursor-not-allowed",
                "hover:brightness-90 group-focus:brightness-90",
                variants[props?.color ?? "neutral"].container,
                props.className
            )}
        >
            {
                (!props.isLoading)
                    ? (null)
                    : (
                        <IconLoader2
                            size={16}
                            className={cn(
                                "min-w-[16px] w-[16px] min-h-[16px] h-[16px]",
                                "stroke-white animate-spin",
                            )}
                        />
                    )
            }
            {
                (props.icon && !props.isLoading)
                    ?
                    cloneElement(props.icon, {
                        "aria-disabled": props.disabled,
                        size: 16,
                        className: cn(
                            "min-w-[16px] w-[16px] min-h-[16px] h-[16px] text-white aria-disabled:text-neutral/50"
                        ),
                        stroke: 2
                    })
                    : null
            }
            {
                (!props.text) ? null : (
                    <span
                        aria-disabled={props.disabled || props.isLoading}
                        className="text-white text-sm leading-[16px] font-medium aria-disabled:opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                        {props.text}
                    </span>
                )
            }
        </div>
    )
}
