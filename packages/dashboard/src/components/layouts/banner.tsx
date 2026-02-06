import { css, cx } from "../../utilities/cn.js"
import { colorVariant } from "@arrhes/application-metadata/components"
import { IconAlertHexagon, IconAlertTriangle, IconCircleCheck, IconInfoSquare } from "@tabler/icons-react"
import { ComponentProps, ReactElement } from "react"




export function Banner(props: {
    text?: string | null
    variant?: (typeof colorVariant)[number]
    className?: ComponentProps<'div'>['className']
    children?: ReactElement | string | null | Array<ReactElement | string | null>
}) {

    const banners = {
        "neutral": {
            icon: null,
            bg: css({ bg: "background" }),
            text: css({ color: "neutral" })
        },
        "information": {
            icon: <IconInfoSquare size={20} className={css({ color: "information" })} />,
            bg: css({ bg: "information/5" }),
            text: css({ color: "information" })
        },
        "error": {
            icon: <IconAlertTriangle size={20} className={css({ color: "error" })} />,
            bg: css({ bg: "error/5" }),
            text: css({ color: "error" })
        },
        "warning": {
            icon: <IconAlertHexagon size={20} className={css({ color: "warning" })} />,
            bg: css({ bg: "warning/5" }),
            text: css({ color: "warning" })
        },
        "success": {
            icon: <IconCircleCheck size={20} className={css({ color: "success" })} />,
            bg: css({ bg: "success/5" }),
            text: css({ color: "success" })
        }
    }

    return (
        <div
            className={cx(
                css({
                    w: "full",
                    p: "4",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "2",
                    rounded: "md"
                }),
                banners[props?.variant ?? "neutral"].bg,
                props.className
            )}
        >
            <p className={cx(
                banners[props?.variant ?? "neutral"].text,
                props.className
            )}
            >
                {props.children}
            </p>
        </div>
    )
}
