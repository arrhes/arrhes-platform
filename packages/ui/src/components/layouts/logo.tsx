import { IconAbacus } from "@tabler/icons-react"
import type { ComponentProps } from "react"
import { css } from "../../utilities/cn.ts"
import { ButtonContent } from "../buttons/buttonContent.tsx"

export function Logo(props: { className?: ComponentProps<"div">["className"]; withText?: boolean }) {
    return (
        <ButtonContent
            variant="invisible"
            leftIcon={<IconAbacus />}
            text={props.withText ? "Arrhes" : undefined}
            className={css({
                fontFamily: "mono",
            })}
        />
    )
}
