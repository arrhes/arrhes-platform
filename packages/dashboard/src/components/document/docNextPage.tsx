import { css, cx } from "../../utilities/cn.js"
import { IconChevronRight } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"


export function DocNextPage(props: {
    to: string
    label: string
}) {
    return (
        <Link
            to={props.to}
            className={cx(
                css({
                    mt: "12",
                    p: "4",
                    rounded: "lg",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    _hover: { bg: "neutral/5" },
                    transition: "colors"
                }),
                "group"
            )}
        >
            <div>
                <span className={css({
                    fontSize: "xs",
                    color: "neutral/50"
                })}>Page suivante</span>
                <p className={css({
                    fontSize: "sm",
                    fontWeight: "medium"
                })}>{props.label}</p>
            </div>
            <IconChevronRight className={css({
                w: "5",
                h: "5",
                color: "neutral/30",
                _groupHover: { color: "neutral/50" },
                transition: "colors"
            })} />
        </Link>
    )
}
