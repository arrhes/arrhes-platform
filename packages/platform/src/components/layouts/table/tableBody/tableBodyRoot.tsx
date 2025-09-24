import { ComponentProps, ReactElement } from "react"
import { cn } from "utilities/cn"


export function TableBodyRoot(props: {
    children?: ReactElement | null | (ReactElement | null)[]
    className?: ComponentProps<'tbody'>['className']
}) {
    return (
        <tbody
            className={cn(
                "w-full",
                props.className
            )}
            children={props.children}
        />
    )
}
