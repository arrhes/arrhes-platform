import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../../utilities/cn.js"


export function TableRoot(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'table'>['className']
}) {
    return (
        <table
            className={cx(
                css({
                    width: "100%",
                    height: "fit",
                    borderCollapse: "collapse"
                }),
                props.className
            )}
            children={props.children}
        />
    )
}
