import { css, cx } from "../../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function TableRoot(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'table'>['className']
}) {
    return (
        <table
            className={cx(
                css({
                    w: "full",
                    h: "fit",
                    borderCollapse: "collapse"
                }),
                props.className
            )}
            children={props.children}
        />
    )
}
