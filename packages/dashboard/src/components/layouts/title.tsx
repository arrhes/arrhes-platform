import { cn } from "#/utilities/cn.js"
import { ComponentProps } from "react"


export function TitleComponent(props: {
    children: string
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <span className={cn(
            "uppercase text-neutral/25 text-base",
            props.className
        )}>
            {props.children}
        </span>
    )
}
