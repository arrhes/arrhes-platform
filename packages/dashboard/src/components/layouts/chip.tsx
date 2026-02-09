import { ComponentProps } from "react"
import { css, cx } from "../../utilities/cn.js"


export type ChipColors = "neutral" | "error" | "warning" | "success" | "information"

const chipColors = {
    "neutral": {
        backgroundColor: css({ backgroundColor: "neutral/5" }),
        border: css({ borderColor: "neutral/10" }),
        text: css({ color: "neutral" })
    },
    "information": {
        backgroundColor: css({ backgroundColor: "information/5" }),
        border: css({ borderColor: "information/10" }),
        text: css({ color: "information" })
    },
    "error": {
        backgroundColor: css({ backgroundColor: "error/5" }),
        border: css({ borderColor: "error/10" }),
        text: css({ color: "error" })
    },
    "warning": {
        backgroundColor: css({ backgroundColor: "warning/5" }),
        border: css({ borderColor: "warning/10" }),
        text: css({ color: "warning" })
    },
    "success": {
        backgroundColor: css({ backgroundColor: "success/5" }),
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
                    width: "fit",
                    height: "fit",
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
