import { cn } from "#/utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function TableBodyRow(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'tr'>['className']
}) {
    return (
        <tr
            className={cn(
                "w-full border-b border-neutral/5 last:border-b-0",
                props.className
            )}
            children={props.children}
        />
    )
}
