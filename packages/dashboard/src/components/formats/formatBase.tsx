import { cn } from "#/utilities/cn.js"
import { ComponentProps, ReactNode } from "react"


type FormatBase = {
    children: ReactNode
    className?: ComponentProps<'div'>['className']
}

export function FormatBase(props: FormatBase) {
    return (
        <div
            className={cn(
                "w-fit max-w-full overflow-auto flex justify-start items-center",
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
