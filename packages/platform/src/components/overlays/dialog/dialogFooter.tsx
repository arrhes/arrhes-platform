
import { cn } from "#/utilities/cn.js"
import { HTMLAttributes } from "react"


export function DialogFooter(props:
    HTMLAttributes<HTMLDivElement>
) {
    return (
        <div
            {...props}
            className={cn(
                "p-4 border-t border-neutral/10 flex flex-wrap justify-end items-center gap-2",
                props.className
            )}
        />
    )
}