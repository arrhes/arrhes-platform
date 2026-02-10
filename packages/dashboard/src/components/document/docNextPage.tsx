import { IconArrowRight } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { css } from "../../utilities/cn.js"


export function DocNextPage(props: {
    to: string
    label: string
}) {
    return (
        <div className={css({
            marginTop: "12",
            pt: "8",
            borderTop: "1px solid",
            borderColor: "neutral/10"
        })}>
            <Link
                to={props.to}
                className={css({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "5",
                    borderRadius: "xl",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    backgroundColor: "white",
                    transition: "all 0.2s",
                    _hover: {
                        borderColor: "primary/30",
                        boxShadow: "sm",
                        transform: "translateX(4px)"
                    }
                })}
            >
                <div>
                    <span className={css({
                        display: "block",
                        fontSize: "xs",
                        fontWeight: "medium",
                        color: "neutral/40",
                        textTransform: "uppercase",
                        letterSpacing: "wider",
                        mb: "1"
                    })}>
                        Page suivante
                    </span>
                    <span className={css({
                        display: "block",
                        fontSize: "md",
                        fontWeight: "semibold",
                        color: "neutral"
                    })}>
                        {props.label}
                    </span>
                </div>
                <IconArrowRight className={css({
                    width: "5",
                    height: "5",
                    color: "primary"
                })} />
            </Link>
        </div>
    )
}
