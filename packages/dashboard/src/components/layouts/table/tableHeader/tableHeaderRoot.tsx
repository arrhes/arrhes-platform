import { css, cx } from "../../../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function TableHeaderRoot(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'thead'>['className']
}) {
    return (
        <thead
            className={cx(
                css({
                    w: "full",
                    borderBottom: "1px solid",
                    borderColor: "neutral/10"
                }),
                props.className
            )}
            children={props.children}
        />
    )
}
