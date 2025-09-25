import { cn } from "#/utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function DataBlockHeader(props: {
    children: null | ReactElement | (null | ReactElement)[]
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cn(
                "shrink-0 w-full h-fit flex justify-start items-start gap-2",
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
