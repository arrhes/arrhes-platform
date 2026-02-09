import { Button } from "@arrhes/ui"
import { ComponentProps } from "react"
import { toast } from "../../contexts/toasts/useToast.js"
import { css } from "../../utilities/cn.js"
import { FormatBase } from "./formatBase.js"
import { FormatNull } from "./formatNull.js"


type FormatLinkProps = {
    text: string | null
    className?: ComponentProps<'span'>['className']
}

export function FormatLink(props: FormatLinkProps) {
    if (!props.text) return <FormatNull />

    const copyContent = (toCopy: string | null) => {
        toast({ title: "Contenu copié dans le presse-papier.", variant: "information" })
        return navigator.clipboard.writeText(!toCopy ? "" : toCopy)
    }

    return (
        <FormatBase className={props.className}>
            <Button
                onClick={() => copyContent(props.text)}
                className={css({
                    width: "100%",
                    overflowidth: "auto",
                    rounded: "none"
                })}
            >
                <span className={css({
                    textAlign: "left",
                    textDecoration: "underline",
                    _hover: { textDecoration: "none" },
                    maxWidth: "100%",
                    overflowWrap: "normal",
                    whiteSpace: "nowrap",
                    overflowidth: "auto",
                    textOverflowidth: "ellipsis"
                })}>
                    {props.text}
                </span>
            </Button>
        </FormatBase>
    )
}
