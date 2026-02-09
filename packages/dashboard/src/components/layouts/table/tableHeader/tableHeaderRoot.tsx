import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../../../utilities/cn.js"


export function TableHeaderRoot(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'thead'>['className']
}) {
    return (
        <thead
            className={cx(
                css({
                    width: "100%",
                    borderBottom: "1px solid",
                    borderColor: "neutral/10"
                }),
                props.className
            )}
            children={props.children}
        />
    )
}
