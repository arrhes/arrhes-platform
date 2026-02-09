import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../../../utilities/cn.js"


export function TableBodyRoot(props: {
    children?: ReactElement | null | (ReactElement | null)[]
    className?: ComponentProps<'tbody'>['className']
}) {
    return (
        <tbody
            className={cx(
                css({ width: "100%" }),
                props.className
            )}
            children={props.children}
        />
    )
}
