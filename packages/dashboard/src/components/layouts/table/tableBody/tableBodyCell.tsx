import { css, cx } from "../../../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function TableBodyCell(props: {
    children?: ReactElement | null | ReactElement[]
    className?: ComponentProps<'td'>['className']
    style?: ComponentProps<'td'>['style']
    align?: ComponentProps<'td'>['align']
    colSpan?: ComponentProps<'td'>['colSpan']
}) {
    return (
        <td
            className={cx(
                css({
                    w: "fit",
                    p: "2",
                    verticalAlign: "top"
                }),
                props.className
            )}
            colSpan={props.colSpan}
            style={props.style}
            align={props.align ?? "left"}
        >
            {props.children}
        </td>
    )
}
