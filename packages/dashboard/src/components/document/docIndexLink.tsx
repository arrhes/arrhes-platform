import { css } from "../../utilities/cn.js";
import { Link } from "@tanstack/react-router";


export function DocIndexLink(props: { to: string; label: string }) {
    return (
        <Link
            to={props.to}
            className={css({
                display: "block",
                fontSize: "sm",
                color: "neutral/70",
                _hover: { color: "neutral" },
                transition: "colors"
            })}
        >
            {props.label}
        </Link>
    )
}
