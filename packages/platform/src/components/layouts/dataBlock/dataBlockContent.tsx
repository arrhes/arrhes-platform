import { ComponentProps, ReactElement } from "react"
import { cn } from "utilities/cn"


export function DataBlockContent(props: {
    children: null | ReactElement | (null | ReactElement)[]
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cn(
                "shrink-0 w-full h-fit grid grid-cols-[max-content_auto] gap-x-4 gap-y-2 p-4 border border-neutral/20 rounded-md",
                props.className
            )}
            children={props.children}
        />
    )
}
