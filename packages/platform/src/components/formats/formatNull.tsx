import { ComponentProps } from "react"
import { cn } from "utilities/cn"


type FormatNull = {
    text?: string
    className?: ComponentProps<'span'>['className']
}

export function FormatNull(props: FormatNull) {
    return (
        <span className={cn(
            "inline-flex flex-row justify-start items-center text-sm italic text-neutral/25 whitespace-nowrap overflow-auto text-ellipsis",
            props.className
        )}>
            {props.text ?? "/"}
        </span>
    )
}
