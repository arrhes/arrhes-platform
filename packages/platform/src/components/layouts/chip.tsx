import { cn } from "#/utilities/cn.js"
import { ComponentProps } from "react"


export type ChipColors = "neutral" | "error" | "warning" | "success" | "information"

const chipColors = {
    "neutral": {
        bg: "bg-neutral/5",
        border: "border-neutral/10",
        text: "text-neutral"
    },
    "information": {
        bg: "bg-information/5",
        border: "border-information/10",
        text: "text-information"
    },
    "error": {
        bg: "bg-error/5",
        border: "border-error/10",
        text: "text-error"
    },
    "warning": {
        bg: "bg-warning/5",
        border: "border-warning/10",
        text: "text-warning"
    },
    "success": {
        bg: "bg-success/5",
        border: "border-success/10",
        text: "text-success"
    }
}

export function Chip(props: {
    text: string | null | undefined
    color?: ChipColors
    className?: ComponentProps<'div'>['className']
}) {
    if (props.text === null) {
        return (null)
    }
    if (props.text === undefined) {
        return (null)
    }

    return (
        <div
            className={cn(
                "w-fit h-fit px-2 py-1 flex justify-start items-center",
                "border-none",
                chipColors[props?.color ?? "neutral"].border,
                chipColors[props?.color ?? "neutral"].bg,
                props.className
            )}
        >
            <span
                className={cn(
                    "text-[10px] leading-none text-neutral/75",
                    chipColors[props?.color ?? "neutral"].text
                )}
            >
                {props.text}
            </span>
        </div>
    )
}
