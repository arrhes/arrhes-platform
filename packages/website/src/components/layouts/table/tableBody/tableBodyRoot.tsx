import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


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
