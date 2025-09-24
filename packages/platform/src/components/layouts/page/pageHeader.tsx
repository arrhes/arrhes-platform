import { ComponentProps, ReactNode } from "react"
import { cn } from "utilities/cn"



export function PageHeader(props: {
    title: string
    description?: string
    children?: ReactNode
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cn(
                "w-full max-w-xl h-fit flex justify-between items-start gap-2",
                props.className
            )}
        >
            <div className="flex flex-col justify-start items-start">
                <span className="text-3xl font-semibold whitespace-nowrap">
                    {props.title}
                </span>
                {
                    (props.description === undefined)
                        ? null
                        : (
                            <span className="text-neutral/50 text-md">
                                {props.description}
                            </span>
                        )
                }
            </div>
            <div className="flex justify-center items-center">
                {props.children}
            </div>
        </div>
    )
}
