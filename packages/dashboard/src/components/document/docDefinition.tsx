import { css } from "../../utilities/cn.js"


export function DocDefinition(props: {
    term: string
    definition: string
}) {
    return (
        <div className={css({
            p: "5",
            rounded: "xl",
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
                mb: "1"
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
