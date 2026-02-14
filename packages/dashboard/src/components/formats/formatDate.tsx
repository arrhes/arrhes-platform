import { FormatText } from "../../components/formats/formatText.js"
import { ComponentProps } from "react"
import { FormatNull } from "./formatNull.js"


export function formatDate(rawDate?: string | Date | undefined | null) {
    if ((!rawDate) || (String(new Date(rawDate)) === "Invalid Date")) return undefined

    const date = new Date(rawDate)
    let day = String(date.getDate())
    let month = String(date.getMonth() + 1)
    let year = String(date.getFullYear())
    let hour = String(date.getHours())
    let minute = String(date.getMinutes())

    if (date.getDate() < 10) day = "0" + day
    if ((date.getMonth() + 1) < 10) month = "0" + month
    if ((date.getHours()) < 10) hour = "0" + hour
    if ((date.getMinutes()) < 10) minute = "0" + minute

    return `${[day, month, year].join('/')}`
}


export function FormatDate(props: {
    date?: string | Date | undefined | null
    className?: ComponentProps<'div'>['className']
}) {
    if (!props.date) return <FormatNull />
    if (String(new Date(props.date)) === "Invalid Date") return <FormatNull />
    return (
        <FormatText
            className={props.className}
        >
            {formatDate(props.date)}
        </FormatText>
    )
}
