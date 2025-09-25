import { cn } from "#/utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


type PageContent = {
    className?: ComponentProps<'div'>['className']
    children: ReactElement | ReactElement[]
}

export function PageContent(props: PageContent) {
    return (
        <div
            className={cn(
                "w-full max-w-xl h-fit flex flex-col justify-start items-start gap-4",
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
