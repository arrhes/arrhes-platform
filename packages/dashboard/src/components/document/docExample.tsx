import { IconInfoCircle } from "@tabler/icons-react"
import { css } from "../../utilities/cn.js"


export function DocExample(props: {
    title?: string
    children: React.ReactNode
}) {
    return (
        <div
            className={css({
                padding: "1rem",
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "information/20",
                backgroundColor: "information/5",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "1rem",
            })}
        >
            {props.title && (
                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
                >
                    <IconInfoCircle className={css({
                        flexShrink: "0",
                        width: "1.5rem",
                        height: "1.5rem",
                        color: "information"
                    })} />
                    <span className={css({
                        fontSize: "md",
                        fontWeight: "semibold",
                        color: "information"
                    })}>
                        {props.title}
                    </span>
                </div>
            )}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "0.5rem",
            })}>
                {props.children}
            </div>
        </div>
    )
}
