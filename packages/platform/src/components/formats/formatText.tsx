import { cn } from "#/utilities/cn.js"
import { ComponentProps, ReactNode } from "react"
import { FormatNull } from "./formatNull.js"


export function FormatText(props: {
    wrap?: boolean
    className?: ComponentProps<'span'>['className']
    children?: ReactNode
}
) {
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
