import { css } from "../../utilities/cn.js"


export function DocSection(props: {
    title: string
    children: React.ReactNode
}) {
    const id = props.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')

    return (
        <section className={css({ mb: "10" })}>
            <h2
                id={id}
                className={css({
                    fontSize: "xl",
                    fontWeight: "semibold",
                    color: "neutral",
                    mb: "4",
                    pb: "2",
                    borderBottom: "1px solid",
                    borderColor: "neutral/10"
                })}
            >
                {props.title}
            </h2>
            <div className={css({ spaceY: "4" })}>
                {props.children}
            </div>
        </section>
    )
}
