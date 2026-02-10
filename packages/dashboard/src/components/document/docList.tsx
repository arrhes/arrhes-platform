import { IconCheck } from "@tabler/icons-react"
import { ReactNode } from "react"
import { css } from "../../utilities/cn.js"


export function DocList(props: {
    items: ReactNode[]
    variant?: "bullet" | "check"
}) {
    const variant = props.variant ?? "bullet"

    return (
        <ul className={css({ spaceY: "2" })}>
            {props.items.map((item, index) => (
                <li key={index} className={css({
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "3",
                    color: "neutral/70",
                    fontSize: "sm",
                    lineHeight: "1.6"
                })}>
                    {variant === "check" ? (
                        <IconCheck className={css({
                            width: "4",
                            height: "4",
                            color: "success",
                            marginTop: "0.5",
                            flexShrink: 0
                        })} />
                    ) : (
                        <span className={css({
                            width: "1.5",
                            height: "1.5",
                            borderRadius: "100%",
                            backgroundColor: "neutral/30",
                            marginTop: "2",
                            flexShrink: 0
                        })} />
                    )}
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    )
}
