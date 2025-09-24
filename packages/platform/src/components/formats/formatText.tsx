import { ComponentProps, ReactNode } from "react"
import { cn } from "utilities/cn.js"
import { FormatNull } from "./formatNull.js"


type FormatText = {
    wrap?: boolean
    className?: ComponentProps<'span'>['className']
    children?: ReactNode
}

export function FormatText(props: FormatText) {
    if (!props.children) return <FormatNull />
    return (
        <span className={cn(
            "text-sm break-words overflow-x-hidden text-ellipsis",
            !props.wrap ? "whitespace-nowrap" : undefined,
            props.className
        )}>
            {props.children}
        </span>
    )
}
