import { ComponentProps, ReactElement } from "react"
import { cn } from "utilities/cn"


export function TableHeaderRow(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'tr'>['className']
}) {
    return (
        <tr
            className={cn(
                "w-full",
                props.className
            )}
            children={props.children}
        />
    )
}
