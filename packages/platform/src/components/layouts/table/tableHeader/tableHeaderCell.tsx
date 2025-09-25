import { cn } from "#/utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function TableHeaderCell(props: {
    children?: ReactElement | ReactElement[]
    className?: ComponentProps<'th'>['className']
    align?: ComponentProps<'th'>['align']
    colSpan?: ComponentProps<'td'>['colSpan']
}) {
    return (
        <th
            className={cn(
                "w-fit p-2 align-middle",
                props.className
            )}
            colSpan={props.colSpan}
            align={props.align ?? "left"}
            children={props.children}
        />
    )
}
