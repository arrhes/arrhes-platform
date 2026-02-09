import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../../../utilities/cn.js"


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
                    width: "fit",
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
