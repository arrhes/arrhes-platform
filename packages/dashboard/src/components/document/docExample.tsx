import { css } from "../../utilities/cn.js"


export function DocExample(props: {
    title?: string
    children: React.ReactNode
}) {
    return (
        <div className={css({
            p: "4",
            rounded: "lg",
            border: "1px solid",
            borderColor: "information/20",
            bg: "information/5",
            mb: "4"
        })}>
            {props.title && (
                <p className={css({
                    fontSize: "xs",
                    fontWeight: "medium",
                    color: "information",
                    mb: "2"
                })}>Exemple : {props.title}</p>
            )}
            <div className={css({
                fontSize: "sm",
                color: "neutral/80"
            })}>
                {props.children}
            </div>
        </div>
    )
}
