import { ComponentProps, ReactNode } from "react"
import { cn } from "utilities/cn"



export function CardHeader(props: {
    children?: ReactNode
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cn(
                "w-full h-fit flex justify-between items-start gap-2 p-2",
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
