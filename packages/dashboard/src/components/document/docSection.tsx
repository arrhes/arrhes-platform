import { css } from "../../utilities/cn.js"


export function DocSection(props: {
    title: string
    children: React.ReactNode
}) {
    return (
        <section className={css({ mb: "8" })}>
            <h2
                className={css({
                    fontSize: "xl",
                    fontWeight: "semibold",
                    mb: "4"
                })}
                id={props.title.toLowerCase().replace(/\s/g, '-')}
            >
                {props.title}
            </h2>
            {props.children}
        </section>
    )
}
