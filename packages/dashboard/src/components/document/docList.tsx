import { css } from "../../utilities/cn.js"


export function DocList(props: {
    items: string[]
}) {
    return (
        <ul className={css({ mb: "4", spaceY: "2" })}>
            {props.items.map((item, index) => (
                <li key={index} className={css({
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "2",
                    color: "neutral/80"
                })}>
                    <span className={css({ color: "neutral/40", mt: "1" })}>-</span>
                    {item}
                </li>
            ))}
        </ul>
    )
}
