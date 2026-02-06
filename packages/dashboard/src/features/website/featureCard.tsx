import { css } from "../../utilities/cn.js"


export function FeatureCard(props: {
    icon: React.ReactNode
    title: string
    description: string
}) {
    return (
        <div className={css({
            p: "6",
            rounded: "lg",
            border: "1px solid",
            borderColor: "neutral/10",
            bg: "white"
        })}>
            <div className={css({
                w: "12",
                h: "12",
                rounded: "lg",
                bg: "neutral/5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "neutral/70",
                mb: "4"
            })}>
                {props.icon}
            </div>
            <h3 className={css({
                fontSize: "lg",
                fontWeight: "medium",
                mb: "2"
            })}>
                {props.title}
            </h3>
            <p className={css({
                fontSize: "sm",
                color: "neutral/70"
            })}>
                {props.description}
            </p>
        </div>
    )
}
