import { Link } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { css, cx } from "../../../utilities/cn.js"


export interface DocSection {
    id: string
    label: string
    path: string
    icon: ReactNode
    navigation: Record<string, {
        title: string
        icon: ReactNode
        items: { path: string; label: string }[]
    }>
}


export function SectionTab(props: {
    section: DocSection
    isActive: boolean
}) {
    return (
        <Link
            to={props.section.path}
            className={cx(
                css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    paddingX: "0.75rem",
                    paddingY: "0.5rem",
                    borderRadius: "md",
                    fontSize: "sm",
                    fontWeight: "medium",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                    "& svg": {
                        width: "1rem",
                        height: "1rem"
                    }
                }),
                css(props.isActive
                    ? {
                        backgroundColor: "primary/10",
                        color: "primary",
                    }
                    : {
                        color: "neutral/60",
                        _hover: {
                            backgroundColor: "neutral/5",
                            color: "neutral"
                        }
                    }
                )
            )}
        >
            {props.section.icon}
            {props.section.label}
        </Link>
    )
}
