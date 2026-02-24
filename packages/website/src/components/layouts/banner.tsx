import type { colorVariant } from "@arrhes/application-metadata/components"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { IconAlertHexagon, IconAlertTriangle, IconCircleCheck, IconInfoSquare } from "@tabler/icons-react"
import type { ComponentProps, ReactElement } from "react"

export function Banner(props: {
    text?: string | null
    variant?: (typeof colorVariant)[number]
    className?: ComponentProps<"div">["className"]
    children?: ReactElement | string | null | Array<ReactElement | string | null>
}) {
    const banners = {
        neutral: {
            icon: null,
            backgroundColor: css({ backgroundColor: "background" }),
            borderColor: css({ borderColor: "neutral/15" }),
            text: css({ color: "neutral" }),
        },
        information: {
            icon: <IconInfoSquare size={18} />,
            backgroundColor: css({ backgroundColor: "information/5" }),
            borderColor: css({ borderColor: "information/15" }),
            text: css({ color: "information" }),
        },
        error: {
            icon: <IconAlertTriangle size={18} />,
            backgroundColor: css({ backgroundColor: "error/5" }),
            borderColor: css({ borderColor: "error/15" }),
            text: css({ color: "error" }),
        },
        warning: {
            icon: <IconAlertHexagon size={18} />,
            backgroundColor: css({ backgroundColor: "warning/5" }),
            borderColor: css({ borderColor: "warning/15" }),
            text: css({ color: "warning" }),
        },
        success: {
            icon: <IconCircleCheck size={18} />,
            backgroundColor: css({ backgroundColor: "success/5" }),
            borderColor: css({ borderColor: "success/15" }),
            text: css({ color: "success" }),
        },
    }

    const variant = props?.variant ?? "neutral"
    const banner = banners[variant]

    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    padding: "0.75rem 1rem",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    borderRadius: "md",
                    border: "1px solid",
                }),
                banner.backgroundColor,
                banner.borderColor,
                props.className,
            )}
        >
            {banner.icon && (
                <span
                    className={cx(
                        css({
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            marginTop: "1px",
                        }),
                        banner.text,
                    )}
                >
                    {banner.icon}
                </span>
            )}
            <p
                className={cx(
                    css({
                        fontSize: "sm",
                        lineHeight: "1.5",
                    }),
                    banner.text,
                )}
            >
                {props.children}
            </p>
        </div>
    )
}
