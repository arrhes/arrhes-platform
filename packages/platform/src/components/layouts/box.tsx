import { ComponentProps, ReactElement } from "react"
import { cn } from "utilities/cn"


export function Box(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cn(
                "min-w-0 w-full max-w-full h-fit shrink-0 flex flex-col justify-start items-start overflow-x-auto",
                "border border-neutral/10 rounded-md",
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
