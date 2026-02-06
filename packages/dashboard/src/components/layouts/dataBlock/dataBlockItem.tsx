import { Tooltip } from "../../../components/overlays/tooltip/tooltip.js"
import { css } from "../../../utilities/cn.js"
import { IconInfoSquareRounded } from "@tabler/icons-react"
import { Fragment, ReactElement } from "react"


export function DataBlockItem(props: {
    label: string
    description?: string
    children: string | ReactElement
}) {
    return (
        <Fragment>
            <div className={css({
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "2"
            })}>
                <span className={css({
                    textTransform: "uppercase",
                    fontSize: "sm",
                    color: "neutral/50"
                })}>{props.label}</span>
                {
                    (!props.description) ? null : (
                        <Tooltip.Root delayDuration={0}>
                            <Tooltip.Trigger className={css({ cursor: "help" })} onClick={(e) => e.preventDefault()}>
                                <IconInfoSquareRounded size={16} strokeWidth={1} className={css({
                                    stroke: "neutral/50",
                                    _hover: {
                                        stroke: "neutral",
                                        fill: "neutral/5"
                                    }
                                })} />
                            </Tooltip.Trigger>
                            <Tooltip.Content className={css({ bg: "neutral" })}>
                                <p className={css({
                                    wordBreak: "break-word",
                                    hyphens: "auto",
                                    color: "white",
                                    fontSize: "sm"
                                })}>{props.description}</p>
                            </Tooltip.Content>
                        </Tooltip.Root>
                    )
                }
            </div>
            <div className={css({
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "2"
            })}>
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
