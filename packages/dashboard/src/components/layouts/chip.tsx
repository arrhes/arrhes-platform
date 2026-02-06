import { css, cx } from "../../utilities/cn.js"
import { ComponentProps } from "react"


export type ChipColors = "neutral" | "error" | "warning" | "success" | "information"

const chipColors = {
    "neutral": {
        bg: css({ bg: "neutral/5" }),
        border: css({ borderColor: "neutral/10" }),
        text: css({ color: "neutral" })
    },
    "information": {
        bg: css({ bg: "information/5" }),
        border: css({ borderColor: "information/10" }),
        text: css({ color: "information" })
    },
    "error": {
        bg: css({ bg: "error/5" }),
        border: css({ borderColor: "error/10" }),
        text: css({ color: "error" })
    },
    "warning": {
        bg: css({ bg: "warning/5" }),
        border: css({ borderColor: "warning/10" }),
        text: css({ color: "warning" })
    },
    "success": {
        bg: css({ bg: "success/5" }),
        border: css({ borderColor: "success/10" }),
        text: css({ color: "success" })
    }
}

export function Chip(props: {
    text: string | null | undefined
    color?: ChipColors
    className?: ComponentProps<'div'>['className']
}) {
    if (props.text === null) {
        return (null)
    }
    if (props.text === undefined) {
        return (null)
    }

    return (
        <div
            className={cx(
                css({
                    w: "fit",
                    h: "fit",
                    px: "2",
                    py: "1",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    border: "none"
                }),
                chipColors[props?.color ?? "neutral"].border,
                chipColors[props?.color ?? "neutral"].bg,
                props.className
            )}
        >
            <span
                className={cx(
                    css({
                        fontSize: "10px",
                        lineHeight: "none",
                        color: "neutral/75"
                    }),
                    chipColors[props?.color ?? "neutral"].text
                )}
            >
                {props.text}
            </span>
        </div>
    )
}
