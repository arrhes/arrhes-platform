import { css, cx } from "../../../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function TableHeaderRow(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'tr'>['className']
}) {
    return (
        <tr
            className={cx(
                css({ w: "full" }),
                props.className
            )}
            children={props.children}
        />
    )
}
