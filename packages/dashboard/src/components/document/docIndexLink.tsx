import { Link } from "@tanstack/react-router"
import { css } from "../../utilities/cn.js"


export function DocIndexLink(props: {
    to: string
    label: string
}) {
    return (
        <Link
            to={props.to}
            className={css({
                display: "flex",
                alignItems: "center",
                gap: "2",
                py: "1.5",
                fontSize: "sm",
                color: "neutral/60",
                _hover: { color: "primary" },
                transition: "colors"
            })}
        >
            <span className={css({
                width: "1.5",
                height: "1.5",
                rounded: "100%",
                backgroundColor: "currentColor",
                opacity: 0.5
            })} />
            {props.label}
        </Link>
    )
}
