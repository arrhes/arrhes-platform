import { cn } from "#/utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function CardContent(props: {
    className?: ComponentProps<'div'>['className']
    children: ReactElement | ReactElement[]
}) {
    return (
        <div
            className={cn(
                "w-full h-fit flex flex-col justify-start items-start",
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
