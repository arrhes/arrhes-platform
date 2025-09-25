import { ComponentProps } from "react"
import { FormatBase } from "./formatBase.js"



export function FormatError(props: {
    text: string
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <FormatBase className={props.className}>
            <span className="inline-flex flex-row justify-start items-center text-sm font-semibold text-error/75 whitespace-nowrap overflow-auto text-ellipsis">
                {props.text}
            </span>
        </FormatBase>
    )
}
