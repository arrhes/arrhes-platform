import { IconAbacus } from "@tabler/icons-react"
import type { ComponentProps } from "react"
import { cx, css } from "../../utilities/cn.ts"


export function Logo(props: {
    className?: ComponentProps<'div'>['className']
    size?: number
}) {
    return (
        <IconAbacus
            size={props.size ?? 16}
            className={cx(
                css({ stroke: "neutral/50" }),
                props.className
            )}
        />
    )
}
