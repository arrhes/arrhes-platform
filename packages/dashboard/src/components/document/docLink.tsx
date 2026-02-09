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
                fontWeight: "medium",
                textDecoration: "underline",
                textDecorationColor: "primary/30",
                textUnderlineOffset: "2px",
                _hover: {
                    textDecorationColor: "primary"
                },
                transition: "all 0.15s"
            })}
        >
            {props.children}
        </Link>
    )
}
