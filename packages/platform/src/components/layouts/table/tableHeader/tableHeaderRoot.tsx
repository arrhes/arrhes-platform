import { ComponentProps, ReactElement } from "react"
import { cn } from "utilities/cn"


export function TableHeaderRoot(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'thead'>['className']
}) {
    return (
        <thead
            className={cn(
                "w-full border-b border-neutral/10",
                props.className
            )}
            children={props.children}
        />
    )
}
