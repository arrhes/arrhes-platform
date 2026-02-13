import {
    IconAlertTriangle,
    IconBulb,
    IconCircleCheck,
    IconInfoCircle
} from "@tabler/icons-react"
import { css } from "../../utilities/cn.js"



const variantConfig: Record<"tip" | "warning" | "info" | "success", {
    icon: React.ReactNode
    label: string
    backgroundColor: string
    borderColor: string
    accentColor: string
    iconColor: string
    labelColor: string
}> = {
    tip: {
        icon: <IconBulb />,
        label: "Conseil",
        backgroundColor: "warning/5",
        borderColor: "warning/10",
        accentColor: "warning",
        iconColor: "warning",
        labelColor: "warning"
    },
    warning: {
        icon: <IconAlertTriangle />,
        label: "Attention",
        backgroundColor: "error/5",
        borderColor: "error/10",
        accentColor: "error",
        iconColor: "error",
        labelColor: "error"
    },
    info: {
        icon: <IconInfoCircle />,
        label: "Information",
        backgroundColor: "information/5",
        borderColor: "information/10",
        accentColor: "information",
        iconColor: "information",
        labelColor: "information"
    },
    success: {
        icon: <IconCircleCheck />,
        label: "Félicitations",
        backgroundColor: "success/5",
        borderColor: "success/10",
        accentColor: "success",
        iconColor: "success",
        labelColor: "success"
    }
}


export function DocTip(props: {
    variant?: keyof typeof variantConfig
    label?: string
    children: React.ReactNode
}) {
    const variant = props.variant ?? "tip"
    const config = variantConfig[variant]
    const label = props.label ?? config.label

    return (
        <div className={css({
            padding: "1.25rem",
            borderRadius: "lg",
            backgroundColor: config.backgroundColor,
            border: "1px solid",
            borderColor: config.borderColor,
            borderLeft: "3px solid",
            borderLeftColor: config.accentColor,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
        })}>
            <div className={css({
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
            })}>
                <div className={css({
                    width: "0.875rem",
                    height: "0.875rem",
                    flexShrink: 0,
                    color: config.iconColor,
                    "& svg": {
                        width: "100%",
                        height: "100%",
                        stroke: config.iconColor,
                    }
                })}>
                    {config.icon}
                </div>
                <span className={css({
                    fontSize: "xs",
                    fontWeight: "medium",
                    color: config.labelColor,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                })}>
                    {label}
                </span>
            </div>
            <span className={css({
                fontSize: "sm",
                color: "neutral/70",
                lineHeight: "1.6"
            })}>
                {props.children}
            </span>
        </div>
    )
}
