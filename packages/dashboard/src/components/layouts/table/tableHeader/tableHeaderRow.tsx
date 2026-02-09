import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../../../utilities/cn.js"


export function TableHeaderRow(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'tr'>['className']
}) {
    return (
        <tr
            className={cx(
                css({ width: "100%" }),
                props.className
            )}
            children={props.children}
        />
    )
}
