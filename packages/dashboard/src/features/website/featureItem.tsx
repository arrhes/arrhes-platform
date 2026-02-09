import { css } from "@arrhes/ui/utilities/cn.js"
import { ReactNode } from "react"


export function FeatureItem(props: {
    icon: ReactNode
    text: string
    highlighted?: boolean
}) {
    return (
        <div
            className={css({
                display: "flex",
                alignItems: "start",
                gap: "0.5rem",
            })}
        >
            <div
                className={css({
                    width: "1.25rem",
                    height: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: props.highlighted ? "primary" : "neutral/50",
                })}
            >
                {props.icon}
            </div>
            <span
                className={css({
                    fontSize: "sm",
                    color: props.highlighted ? "primary" : "neutral",
                    fontWeight: props.highlighted ? "medium" : "normal",
                })}
            >
                {props.text}
            </span>
        </div>
    )
}
