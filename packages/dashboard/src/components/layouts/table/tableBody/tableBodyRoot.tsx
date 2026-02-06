import { css, cx } from "../../../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


export function TableBodyRoot(props: {
    children?: ReactElement | null | (ReactElement | null)[]
    className?: ComponentProps<'tbody'>['className']
}) {
    return (
        <tbody
            className={cx(
                css({ w: "full" }),
                props.className
            )}
            children={props.children}
        />
    )
}
