import { Tooltip } from "#/components/overlays/tooltip/tooltip.js"
import { IconInfoSquareRounded } from "@tabler/icons-react"
import { Fragment, ReactElement } from "react"


export function DataBlockItem(props: {
    label: string
    description?: string
    children: string | ReactElement
}) {
    return (
        <Fragment>
            <div className="flex justify-start items-start gap-2">
                <span className="uppercase text-sm text-neutral/50">{props.label}</span>
                {
                    (!props.description) ? null : (
                        <Tooltip.Root delayDuration={0}>
                            <Tooltip.Trigger className="cursor-help" onClick={(e) => e.preventDefault()}>
                                <IconInfoSquareRounded size={16} strokeWidth={1} className="stroke-neutral/50 hover:stroke-neutral hover:fill-neutral/5" />
                            </Tooltip.Trigger>
                            <Tooltip.Content className="bg-neutral">
                                <p className="break-words hyphens-auto text-white text-sm">{props.description}</p>
                            </Tooltip.Content>
                        </Tooltip.Root>
                    )
                }
            </div>
            <div className="flex justify-start items-start gap-2">
                {
                    !(props.children instanceof String) ? props.children :
                        (
                            <span>{props.children}</span>
                        )
                }
            </div>
        </Fragment>
    )
}
