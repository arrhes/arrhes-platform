import { IconLoader2 } from "@tabler/icons-react"
import { css, cx } from "../../utilities/cn.ts"


export function CircularLoader(props: {
    text?: string
    className?: string
    size?: number
}) {
    return (
        <div className={cx(
            css({
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "0.5rem",
            }),
            props.className
        )}>
            <IconLoader2
                size={props.size ?? 16}
                className={css({
                    animation: "spin 1s linear infinite",
                    stroke: "neutral/50",
                })}
            />
            {props.text && (
                <span className={css({
                    fontSize: "xs",
                    lineHeight: "none",
                    color: "neutral/25",
                    fontStyle: "italic",
                    whiteSpace: "nowrap",
                })}>
                    {props.text}
                </span>
            )}
        </div>
    )
}
