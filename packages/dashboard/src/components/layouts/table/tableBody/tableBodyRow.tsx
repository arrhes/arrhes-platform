import { css, cx } from "../../../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function TableBodyRow(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'tr'>['className']
}) {
    return (
        <tr
            className={cx(
                css({
                    w: "full",
                    borderBottom: "1px solid",
                    borderColor: "neutral/5",
                    _last: { borderBottom: "0" }
                }),
                props.className
            )}
            children={props.children}
        />
    )
}
