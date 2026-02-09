import { ComponentProps, ReactNode } from "react"
import { css, cx } from "../../../utilities/cn.js"



export function PageHeader(props: {
    title: string
    description?: string
    children?: ReactNode
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    maxWidth: "xl",
                    height: "fit",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "2"
                }),
                props.className
            )}
        >
            <div className={css({
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start"
            })}>
                <span className={css({
                    fontSize: "3xl",
                    fontWeight: "semibold",
                    whiteSpace: "nowrap"
                })}>
                    {props.title}
                </span>
                {
                    (props.description === undefined)
                        ? null
                        : (
                            <span className={css({
                                color: "neutral/50",
                                fontSize: "md"
                            })}>
                                {props.description}
                            </span>
                        )
                }
            </div>
            <div className={css({
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            })}>
                {props.children}
            </div>
        </div>
    )
}
