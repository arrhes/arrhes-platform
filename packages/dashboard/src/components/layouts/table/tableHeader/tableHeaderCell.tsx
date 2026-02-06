import { css, cx } from "../../../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function TableHeaderCell(props: {
    children?: ReactElement | ReactElement[]
    className?: ComponentProps<'th'>['className']
    align?: ComponentProps<'th'>['align']
    colSpan?: ComponentProps<'td'>['colSpan']
}) {
    return (
        <th
            className={cx(
                css({
                    w: "fit",
                    p: "2",
                    verticalAlign: "middle"
                }),
                props.className
            )}
            colSpan={props.colSpan}
            align={props.align ?? "left"}
            children={props.children}
        />
    )
}
