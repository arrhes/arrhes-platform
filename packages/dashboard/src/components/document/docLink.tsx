import { css } from "../../utilities/cn.js"
import { Link } from "@tanstack/react-router"


export function DocLink(props: {
    to: string
    children: React.ReactNode
}) {
    return (
        <Link
            to={props.to}
            className={css({
                color: "primary",
                _hover: { textDecoration: "underline" }
            })}
        >
            {props.children}
        </Link>
    )
}
