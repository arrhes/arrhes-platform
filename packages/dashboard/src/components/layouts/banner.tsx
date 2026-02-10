import { colorVariant } from "@arrhes/application-metadata/components"
import { IconAlertHexagon, IconAlertTriangle, IconCircleCheck, IconInfoSquare } from "@tabler/icons-react"
import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../utilities/cn.js"




export function Banner(props: {
    text?: string | null
    variant?: (typeof colorVariant)[number]
    className?: ComponentProps<'div'>['className']
    children?: ReactElement | string | null | Array<ReactElement | string | null>
}) {

    const banners = {
        "neutral": {
            icon: null,
            backgroundColor: css({ backgroundColor: "background" }),
            text: css({ color: "neutral" })
        },
        "information": {
            icon: <IconInfoSquare size={20} className={css({ color: "information" })} />,
            backgroundColor: css({ backgroundColor: "information/5" }),
            text: css({ color: "information" })
        },
        "error": {
            icon: <IconAlertTriangle size={20} className={css({ color: "error" })} />,
            backgroundColor: css({ backgroundColor: "error/5" }),
            text: css({ color: "error" })
        },
        "warning": {
            icon: <IconAlertHexagon size={20} className={css({ color: "warning" })} />,
            backgroundColor: css({ backgroundColor: "warning/5" }),
            text: css({ color: "warning" })
        },
        "success": {
            icon: <IconCircleCheck size={20} className={css({ color: "success" })} />,
            backgroundColor: css({ backgroundColor: "success/5" }),
            text: css({ color: "success" })
        }
    }

    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    padding: "4",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "2",
                    borderRadius: "md"
                }),
                banners[props?.variant ?? "neutral"].backgroundColor,
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
