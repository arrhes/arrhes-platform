import { ReactNode } from "react"
import { css } from "../../utilities/cn.js"


export function DocDefinition(props: {
    term: string
    definition: ReactNode
}) {
    return (
        <div className={css({
            padding: "1rem",
            borderRadius: "lg",
            backgroundColor: "white",
            border: "1px solid",
            borderColor: "neutral/10",
            borderLeft: "3px solid",
            borderLeftColor: "primary"
        })}>
            <dt className={css({
                fontWeight: "semibold",
                color: "neutral",
                fontSize: "sm",
            })}>
                {props.term}
            </dt>
            <dd className={css({
                fontSize: "sm",
                color: "neutral/60",
                lineHeight: "1.6"
            })}>
                {props.definition}
            </dd>
        </div>
    )
}
