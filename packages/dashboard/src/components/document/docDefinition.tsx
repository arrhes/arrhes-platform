import { css } from "../../utilities/cn.js"


export function DocDefinition(props: {
    term: string
    definition: string
}) {
    return (
        <div className={css({
            p: "4",
            rounded: "lg",
            bg: "neutral/5",
            border: "1px solid",
            borderColor: "neutral/10",
            mb: "4"
        })}>
            <dt className={css({
                fontWeight: "medium",
                color: "neutral",
                mb: "1"
            })}>{props.term}</dt>
            <dd className={css({
                fontSize: "sm",
                color: "neutral/70"
            })}>{props.definition}</dd>
        </div>
    )
}
