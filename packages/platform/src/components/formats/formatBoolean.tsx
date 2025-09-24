import { Chip } from "components/layouts/chip"
import { ComponentProps } from "react"
import { FormatBase } from "./formatBase"


export function formatBoolean(boolean?: boolean | null) {
    if (!boolean) return "Non"
    return "Oui"
}


export function FormatBoolean(props: {
    boolean?: boolean | null
    text?: string
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <FormatBase className={props.className}>
            <Chip
                text={props.text ?? (!props.boolean ? "Non" : "Oui")}
                color={!props.boolean ? "error" : "success"}
            />
        </FormatBase>
    )
}
