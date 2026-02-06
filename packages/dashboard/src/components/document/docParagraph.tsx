import { css } from "../../utilities/cn.js"


export function DocParagraph(props: {
    children: React.ReactNode
}) {
    return (
        <p className={css({
            color: "neutral/80",
            lineHeight: "relaxed",
            mb: "4"
        })}>
            {props.children}
        </p>
    )
}
