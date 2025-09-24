import { ComponentProps, ReactElement } from "react"
import { cn } from "utilities/cn"


type CardRoot = {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'div'>['className']
}

export function CardRoot(props: CardRoot) {
    return (
        <div
            className={cn(
                "w-full shrink-0 flex-1 flex flex-col justify-start items-stretch overflow-auto",
                "border border-neutral/10 rounded-md",
                props.className
            )}
            children={props.children}
        />
    )
}
