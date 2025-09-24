import { IconLoader2 } from "@tabler/icons-react"
import { ComponentProps } from "react"
import { cn } from "utilities/cn"


type CircularLoader = {
    text?: string
    className?: ComponentProps<'div'>['className']
    size?: number
}

export function CircularLoader(props: CircularLoader) {
    return (
        <div className={cn(
            "flex justify-start items-center gap-2",
            props.className
        )}>
            <IconLoader2
                size={props.size ?? 16}
                className="animate-spin stroke-neutral/50"
            />
            {
                (props.text === undefined)
                    ? (null)
                    : (
                        <span className="text-xs leading-none text-neutral/25 italic whitespace-nowrap">
                            {props.text}
                        </span>
                    )
            }
        </div>
    )
}
