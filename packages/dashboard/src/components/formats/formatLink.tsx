import { Button } from "@arrhes/ui"
import { toast } from "../../contexts/toasts/useToast.js"
import { css } from "../../utilities/cn.js"
import { ComponentProps } from "react"
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
                    w: "full",
                    overflow: "auto",
                    rounded: "none"
                })}
            >
                <span className={css({
                    textAlign: "left",
                    textDecoration: "underline",
                    _hover: { textDecoration: "none" },
                    maxW: "full",
                    overflowWrap: "normal",
                    whiteSpace: "nowrap",
                    overflow: "auto",
                    textOverflow: "ellipsis"
                })}>
                    {props.text}
                </span>
            </Button>
        </FormatBase>
    )
}
