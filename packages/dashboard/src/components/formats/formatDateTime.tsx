import { css } from "@arrhes/ui/utilities/cn.js"
import { ComponentProps } from "react"
import { FormatNull } from "./formatNull.js"


export function formatDateTime(rawDate?: string | Date | undefined | null) {
    if ((!rawDate) || (String(new Date(rawDate)) === "Invalid Date")) return "/"

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

    return `${[day, month, year].join('/')} ${[hour, minute].join(':')}`
}


type FormatDateTime = {
    date?: string | Date | undefined | null
    className?: ComponentProps<'div'>['className']
}

export function FormatDateTime(props: FormatDateTime) {
    if (!props.date) return <FormatNull />
    if (String(new Date(props.date)) === "Invalid Date") return <FormatNull />

    const date = new Date(props.date)
    let day = String(date.getDate())
    let month = String(date.getMonth() + 1)
    let year = String(date.getFullYear())
    let hour = String(date.getHours())
    let minute = String(date.getMinutes())

    if (date.getDate() < 10) day = "0" + day
    if ((date.getMonth() + 1) < 10) month = "0" + month
    if ((date.getHours()) < 10) hour = "0" + hour
    if ((date.getMinutes()) < 10) minute = "0" + minute

    return (
        <div className={css({
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "1"
        })}>
            <span className={css({ fontSize: "sm" })}>{`${[day, month, year].join('/')}`}</span>
            <span className={css({
                fontSize: "xs",
                lineHeight: "none",
                color: "neutral/75"
            })}>{`${[hour, minute].join(':')}`}</span>
        </div>
    )
}
