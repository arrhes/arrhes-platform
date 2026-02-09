import {
    IconAlertTriangle,
    IconBulb,
    IconCircleCheck,
    IconInfoCircle
} from "@tabler/icons-react"
import { css } from "../../utilities/cn.js"


type DocTipVariant = "tip" | "warning" | "info" | "success"

const variantConfig: Record<DocTipVariant, {
    icon: React.ReactNode
    label: string
    backgroundColor: string
    borderColor: string
    iconColor: string
    labelColor: string
}> = {
    tip: {
        icon: <IconBulb />,
        label: "Conseil",
        backgroundColor: "warning/8",
        borderColor: "warning/20",
        iconColor: "warning",
        labelColor: "warning"
    },
    warning: {
        icon: <IconAlertTriangle />,
        label: "Attention",
        backgroundColor: "danger/8",
        borderColor: "danger/20",
        iconColor: "danger",
        labelColor: "danger"
    },
    info: {
        icon: <IconInfoCircle />,
        label: "Information",
        backgroundColor: "information/8",
        borderColor: "information/20",
        iconColor: "information",
        labelColor: "information"
    },
    success: {
        icon: <IconCircleCheck />,
        label: "Félicitations",
        backgroundColor: "success/8",
        borderColor: "success/20",
        iconColor: "success",
        labelColor: "success"
    }
}


export function DocTip(props: {
    variant?: DocTipVariant
    label?: string
    children: React.ReactNode
}) {
    const variant = props.variant ?? "tip"
    const config = variantConfig[variant]
    const label = props.label ?? config.label

    return (
        <div className={css({
            padding: "1.5rem",
            borderRadius: "lg",
            backgroundColor: config.backgroundColor,
            border: "1px solid",
            borderColor: config.borderColor
        })}>
            <div className={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "0.75rem"
            })}>
                <div className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                })}>
                    <div className={css({
                        width: "1.25rem",
                        height: "1.25rem",
                        flexShrink: 0,
                        color: config.iconColor,
                        "& svg": {
                            width: "100%",
                            height: "100%"
                        }
                    })}>
                        {config.icon}
                    </div>
                    <span className={css({
                        fontWeight: "semibold",
                        color: config.labelColor,
                        fontSize: "md",
                    })}>
                        {label}
                    </span>
                </div>
                <div className={css({ flex: "1" })}>

                    <span className={css({
                        fontSize: "sm",
                        color: "neutral/80",
                        lineHeight: "relaxed"
                    })}>
                        {props.children}
                    </span>
                </div>
            </div>
        </div>
    )
}
