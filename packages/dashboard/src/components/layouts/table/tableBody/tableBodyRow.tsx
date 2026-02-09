import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../../../utilities/cn.js"


export function TableBodyRow(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'tr'>['className']
}) {
    return (
        <tr
            className={cx(
                css({
                    width: "100%",
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
