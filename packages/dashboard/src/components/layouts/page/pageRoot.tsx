import { cn } from "#/utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


type PageRoot = {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'div'>['className']
}

export function PageRoot(props: PageRoot) {
    return (
        <div
            className={cn(
                "w-full shrink-0 flex-1 flex flex-col justify-start items-center overflow-auto p-4 md:p-8 gap-4 md:gap-8 bg-white",
                " border-t border-neutral/10",
                props.className
            )}
            children={props.children}
        />
    )
}
