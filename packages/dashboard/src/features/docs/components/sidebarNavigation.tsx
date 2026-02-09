import { Link } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { css, cx } from "../../../utilities/cn.js"


export interface NavigationSection {
    title: string
    icon: ReactNode
    items: { path: string; label: string }[]
}


export function SidebarNavigation(props: {
    navigation: Record<string, NavigationSection>
    pathname: string
    onItemClick: () => void
}) {
    return (
        <nav className={css({
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "1rem",
            paddingLeft: 0,
        })}>
            {Object.entries(props.navigation).map(([key, section]) => (
                <div key={key} className={css({ marginBottom: "0.5rem" })}>
                    <div className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5rem",
                        fontSize: "xs",
                        fontWeight: "semibold",
                        color: "neutral/40",
                        textTransform: "uppercase",
                        letterSpacing: "wider"
                    })}>
                        {section.icon}
                        {section.title}
                    </div>
                    <div className={css({
                        marginTop: "0.25rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem"
                    })}>
                        {section.items.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={props.onItemClick}
                                className={cx(
                                    css({
                                        paddingX: "0.75rem",
                                        paddingY: "0.5rem",
                                        borderRadius: "md",
                                        fontSize: "sm",
                                        transition: "all 0.15s",
                                    }),
                                    css(props.pathname === item.path
                                        ? {
                                            backgroundColor: "primary/8",
                                            color: "primary",
                                            fontWeight: "medium",
                                            borderColor: "primary"
                                        }
                                        : {
                                            color: "neutral",
                                            _hover: {
                                                backgroundColor: "neutral/5",
                                                color: "neutral",
                                                borderColor: "neutral/20"
                                            }
                                        }
                                    )
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </nav>
    )
}
