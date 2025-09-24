import { ComponentProps } from "react"
import { cn } from "utilities/cn"


type PageSeparator = ComponentProps<"div">

export function PageSeparator(props: PageSeparator) {
    return (
        <div
            className={
                cn(
                    "w-full h-[1px] border-b border-neutral/10",
                    props.className
                )
            }
        />
    )
}
