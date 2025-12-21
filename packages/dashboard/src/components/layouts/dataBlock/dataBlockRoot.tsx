import { cn } from "#/utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function DataBlockRoot(props: {
    children: null | ReactElement | (null | ReactElement)[]
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cn(
                "shrink-0 w-full h-fit flex flex-col justify-start items-stretch gap-2",
                props.className
            )}
            children={props.children}
        />
    )
}
