import { IconInfoCircle } from "@tabler/icons-react"
import { css } from "../../utilities/cn.js"


export function DocExample(props: {
    title?: string
    children: React.ReactNode
}) {
    return (
        <div className={css({
            padding: "5",
            borderRadius: "xl",
            border: "1px solid",
            borderColor: "information/20",
            backgroundColor: "information/5"
        })}>
            {props.title && (
                <div className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "2",
                    mb: "3"
                })}>
                    <IconInfoCircle className={css({
                        width: "4",
                        height: "4",
                        color: "information"
                    })} />
                    <span className={css({
                        fontSize: "sm",
                        fontWeight: "semibold",
                        color: "information"
                    })}>
                        Exemple : {props.title}
                    </span>
                </div>
            )}
            <div className={css({
                fontSize: "sm",
                color: "neutral/80",
                lineHeight: "1.6",
                "& ol": {
                    spaceY: "2",
                    pl: "0",
                    listStyle: "none"
                },
                "& ol li": {
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "2"
                }
            })}>
                {props.children}
            </div>
        </div>
    )
}
