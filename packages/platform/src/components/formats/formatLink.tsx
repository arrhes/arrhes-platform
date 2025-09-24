import { Button } from "components/buttons/button.js"
import { toast } from "contexts/toasts/useToast.js"
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
                className="w-full overflow-auto rounded-none"
            >
                <span className="text-left underline hover:no-underline max-w-full break-normal whitespace-nowrap overflow-auto text-ellipsis">
                    {props.text}
                </span>
            </Button>
        </FormatBase>
    )
}
