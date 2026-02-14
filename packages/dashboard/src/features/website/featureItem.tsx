import { css } from "@arrhes/ui/utilities/cn.js"
import { ReactNode } from "react"


export function FeatureItem(props: {
    icon: ReactNode
    text: string
    highlighted?: boolean
    isDev?: boolean
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
            <div
                className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                })}
            >
                {props.isDev && (
                    <span
                        className={css({
                            fontSize: "xs",
                            textTransform: "uppercase",
                            letterSpacing: "wider",
                            fontWeight: "medium",
                            paddingX: "0.4rem",
                            paddingY: "0.15rem",
                            borderRadius: "full",
                            backgroundColor: "success/5",
                            color: "success",
                        })}
                    >
                        en développement
                    </span>
                )}
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
        </div>
    )
}
