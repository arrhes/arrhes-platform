import { cn } from "#/utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function TableRoot(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'table'>['className']
}) {
    return (
        <table
            className={cn(
                "w-full h-fit border-collapse",
                props.className
            )}
            children={props.children}
        />
    )
}
