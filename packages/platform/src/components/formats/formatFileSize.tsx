import { FormatBase } from "components/formats/formatBase"
import { FormatNull } from "components/formats/formatNull"
import { ComponentProps } from "react"


const sizes = ['o', 'ko', 'Mo', 'Go', 'To']

export function formatFileSize(size?: number | null) {
    if (size === undefined || size === null) return "/"

    if (size == 0) return `0 ${sizes.at(0)}`
    const i = Math.floor(Math.log(size) / Math.log(1000))
    return `${parseFloat((size / Math.pow(1000, i)).toFixed(2))} ${sizes.at(i)}`

}


type FormatFileSize = {
    size?: number | null
    className?: ComponentProps<'div'>['className']
}

export function FormatFileSize(props: FormatFileSize) {
    if (props.size === undefined || props.size === null) return <FormatNull />
    return (
        <FormatBase className={props.className}>
            <span className="w-fit max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-base break-words">
                {formatFileSize(props.size)}
            </span>
        </FormatBase>
    )
}
