import { cn } from "#/utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function SectionRoot(props: {
    children: null | ReactElement | (null | ReactElement)[]
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cn(
                "grow min-w-0 w-full max-w-full h-fit flex flex-col justify-start items-start gap-8",
                props.className
            )}
            children={props.children}
        />
    )
}
