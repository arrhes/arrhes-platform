
import { HTMLAttributes } from "react"
import { cn } from "utilities/cn"


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