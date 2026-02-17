import { css } from "@arrhes/ui/utilities/cn.js"
import { IconInfoSquareRounded } from "@tabler/icons-react"
import { Fragment, type ReactElement } from "react"
import { Tooltip } from "../../overlays/tooltip/tooltip.js"

export function DataBlockItem(props: { label: string; description?: string; children: ReactElement }) {
    return (
        <Fragment>
            <div
                className={css({
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.625rem",
                    paddingLeft: "1rem",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/5",
                    _last: {
                        borderBottom: "none",
                    },
                })}
            >
                <span
                    className={css({
                        textTransform: "uppercase",
                        fontSize: "xs",
                        fontWeight: "medium",
                        letterSpacing: "wide",
                        color: "neutral/40",
                    })}
                >
                    {props.label}
                </span>
                {!props.description ? null : (
                    <Tooltip.Root delayDuration={0}>
                        <Tooltip.Trigger className={css({ cursor: "help" })} onClick={(e) => e.preventDefault()}>
                            <IconInfoSquareRounded
                                size={16}
                                strokeWidth={1}
                                className={css({
                                    stroke: "neutral/50",
                                    _hover: {
                                        stroke: "neutral",
                                        fill: "neutral/5",
                                    },
                                })}
                            />
                        </Tooltip.Trigger>
                        <Tooltip.Content className={css({ backgroundColor: "neutral" })}>
                            <p
                                className={css({
                                    wordBreak: "break-word",
                                    hyphens: "auto",
                                    color: "white",
                                    fontSize: "sm",
                                })}
                            >
                                {props.description}
                            </p>
                        </Tooltip.Content>
                    </Tooltip.Root>
                )}
            </div>
            <div
                className={css({
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.625rem",
                    paddingRight: "1rem",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/5",
                    _last: {
                        borderBottom: "none",
                    },
                })}
            >
                {props.children}
            </div>
        </Fragment>
    )
}
