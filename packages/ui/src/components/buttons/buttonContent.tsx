import type { Icon, IconProps } from "@tabler/icons-react"
import { cloneElement, type ReactElement } from "react"
import { css, cx } from "../../utilities/cn.ts"
import { CircularLoader } from "../layouts/circularLoader"
import { useButtonLoading } from "./button"

// Color variants available for all button styles (GitHub Primer inspired)
// Includes legacy aliases for backward compatibility: error->danger, warning->neutral, information->neutral
export type ButtonColor = "neutral" | "danger" | "success" | "error" | "warning" | "information"

// Map legacy colors to new colors
const colorMap: Record<ButtonColor, "neutral" | "danger" | "success"> = {
    neutral: "neutral",
    danger: "danger",
    success: "success",
    error: "danger", // legacy alias
    warning: "neutral", // legacy alias (maps to neutral)
    information: "neutral", // legacy alias (maps to neutral)
}

// Button style variants (GitHub Primer inspired)
export type ButtonVariant = "default" | "primary" | "outline" | "invisible"

// GitHub Primer-inspired style configurations
const variantStyles = {
    // Primary: Green background, white text (like GitHub's primary action)
    primary: {
        base: css({
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "rgba(31, 35, 40, 0.15)",
            backgroundColor: "primary",
            color: "white",
            stroke: "white",
            fontWeight: "medium",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
            _hover: {
                bg: "primary/90",
                filter: "brightness(0.95)",
            },
            _active: {
                bg: "primary/90",
            },
        }),
        colors: {
            neutral: {
                container: css({}),
                icon: css({ stroke: "white" }),
                text: css({ color: "white" }),
            },
            danger: {
                container: css({
                    bg: "error",
                    borderColor: "rgba(31, 35, 40, 0.15)",
                    _hover: { bg: "#c2341f" },
                    _active: { bg: "#a22015" },
                }),
                icon: css({ stroke: "white" }),
                text: css({ color: "white" }),
            },
            success: {
                container: css({}),
                icon: css({ stroke: "white" }),
                text: css({ color: "white" }),
            },
        },
    },
    // Default: Light gray background with border (like GitHub's secondary button)
    default: {
        base: css({
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "neutral/20",
            bg: "white",
            fontWeight: "medium",
            boxShadow: "0 1px 0 rgba(31, 35, 40, 0.04)",
            _hover: {
                bg: "neutral/5",
                borderColor: "neutral/25",
            },
            _active: {
                bg: "neutral/10",
            },
        }),
        colors: {
            neutral: {
                container: css({}),
                icon: css({ stroke: "neutral" }),
                text: css({ color: "neutral" }),
            },
            danger: {
                container: css({
                    _hover: { bg: "error/5", borderColor: "error/30" },
                }),
                icon: css({ stroke: "error" }),
                text: css({ color: "error" }),
            },
            success: {
                container: css({
                    _hover: { bg: "success/5", borderColor: "success/30" },
                }),
                icon: css({ stroke: "success" }),
                text: css({ color: "success" }),
            },
        },
    },
    // Outline: Transparent background with visible border
    outline: {
        base: css({
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "neutral/20",
            bg: "transparent",
            fontWeight: "medium",
            _hover: {
                bg: "neutral/5",
                borderColor: "neutral/30",
            },
            _active: {
                bg: "neutral/10",
            },
        }),
        colors: {
            neutral: {
                container: css({}),
                icon: css({ stroke: "neutral" }),
                rightIcon: css({ stroke: "neutral/50" }),
                text: css({ color: "neutral" }),
            },
            danger: {
                container: css({
                    borderColor: "error/40",
                    _hover: { bg: "error/5", borderColor: "error/50" },
                }),
                icon: css({ stroke: "error" }),
                rightIcon: css({ stroke: "error/50" }),
                text: css({ color: "error" }),
            },
            success: {
                container: css({
                    borderColor: "success/40",
                    _hover: { bg: "success/5", borderColor: "success/50" },
                }),
                icon: css({ stroke: "success" }),
                rightIcon: css({ stroke: "success/50" }),
                text: css({ color: "success" }),
            },
        },
    },
    // Invisible: No background, no border (like GitHub's invisible/ghost button)
    invisible: {
        base: css({
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "transparent",
            bg: "transparent",
            _hover: {
                bg: "neutral/10",
            },
            _active: {
                bg: "neutral/12",
                backgroundColor: "primary/10",
            },
        }),
        colors: {
            neutral: {
                container: css({
                    _active: {
                        backgroundColor: "primary/10",
                    },
                }),
                icon: css({ stroke: "neutral/70" }),
                text: css({ color: "neutral" }),
            },
            danger: {
                container: css({
                    _hover: {
                        backgroundColor: "error/8",
                    },
                }),
                icon: css({ stroke: "error" }),
                text: css({ color: "error" }),
            },
            success: {
                container: css({
                    _hover: { bg: "success/8" },
                }),
                icon: css({ stroke: "success" }),
                text: css({ color: "success" }),
            },
        },
    },
}

/**
 * ButtonContent renders the visual content of a button (icon, text, loader)
 * Styled to match GitHub's Primer design system
 * Can be used standalone or wrapped by Button/Link for click handling
 *
 * When used inside a Button with hasLoader, loading state is automatically
 * propagated via context and will show the spinner without manual isLoading prop
 */
export function ButtonContent(props: {
    variant?: ButtonVariant
    color?: ButtonColor
    text?: string
    title?: string
    leftIcon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    rightIcon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    isLoading?: boolean
    isDisabled?: boolean
    isActive?: boolean
    className?: string
}) {
    const variant = props.variant ?? "default"
    const rawColor = props.color ?? "neutral"
    const color = colorMap[rawColor] // Map legacy colors
    const styles = variantStyles[variant].colors[color]

    // Use loading state from context if not explicitly set via props
    const contextLoading = useButtonLoading()
    const isLoading = props.isLoading ?? contextLoading

    const baseContainerStyles = css({
        width: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem",
        borderRadius: "md",
        boxSizing: "border-box",
        cursor: "pointer",
        transition: "all",
        transitionDuration: "200ms",
        transitionTimingFunction: "ease-in-out",
        _disabled: {
            opacity: 0.5,
            cursor: "not-allowed",
            _hover: {
                backgroundColor: "transparent",
            },
        },
    })

    const iconOnlyStyles =
        props.text === undefined
            ? css({
                  width: "auto",
                  padding: "0",
                  justifyContent: "center",
              })
            : ""

    const baseContainerActiveStyles = props.isActive ? css({ backgroundColor: "neutral/5" }) : ""

    const leftIconActiveStyles = props.isActive ? css({ color: "primary" }) : ""

    const textActiveStyles = props.isActive ? css({ color: "primary" }) : ""

    return (
        <div
            title={props.title ?? props.text}
            aria-current={props.isActive || isLoading}
            aria-disabled={props.isDisabled || isLoading}
            className={cx(
                baseContainerStyles,
                iconOnlyStyles,
                baseContainerActiveStyles,
                variantStyles[variant].base,
                styles.container,
                props.className,
            )}
        >
            {/* Loading spinner */}
            {isLoading && (
                <CircularLoader
                    size={16}
                    className={cx(
                        css({
                            minWidth: `1rem`,
                            width: `1rem`,
                            minHeight: `1rem`,
                            height: `1rem`,
                            flexShrink: 0,
                        }),
                        variant === "primary" ? css({ stroke: "white" }) : styles.icon,
                    )}
                />
            )}

            {/* Left icon */}
            {props.leftIcon &&
                !isLoading &&
                cloneElement(props.leftIcon, {
                    "aria-disabled": props.isDisabled,
                    size: 16,
                    className: cx(
                        css({
                            minWidth: `1rem`,
                            width: `1rem`,
                            minHeight: `1rem`,
                            height: `1rem`,
                            flexShrink: 0,
                        }),
                        leftIconActiveStyles,
                        variant === "primary"
                            ? css({ stroke: "white", _disabled: { stroke: "white/50" } })
                            : cx(styles.icon, css({ _disabled: { stroke: "neutral/50" } })),
                    ),
                    strokeWidth: 1.75,
                })}

            {/* Text label */}
            {props.text && (
                <span
                    aria-disabled={props.isDisabled || isLoading}
                    className={cx(
                        css({
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontSize: "0.875rem",
                            lineHeight: "1rem",
                            fontWeight: "400",
                        }),
                        textActiveStyles,
                        variant === "primary"
                            ? css({ color: "white", _disabled: { opacity: 0.5 } })
                            : cx(styles.text, css({ _disabled: { color: "neutral/50" } })),
                    )}
                >
                    {props.text}
                </span>
            )}

            {/* Right icon */}
            {props.rightIcon && (
                <div className={css({ display: "flex", alignItems: "center", justifyContent: "center" })}>
                    {isLoading ? (
                        <CircularLoader
                            size={16 - 4}
                            className={cx(
                                css({
                                    minWidth: "1rem",
                                    width: "1rem",
                                    minHeight: "1rem",
                                    height: "1rem",
                                }),
                                variant === "primary" ? css({ stroke: "white" }) : styles.icon,
                            )}
                        />
                    ) : (
                        cloneElement(props.rightIcon, {
                            "aria-disabled": props.isDisabled,
                            size: 16 - 4,
                            className: cx(
                                css({
                                    minWidth: "1rem",
                                    width: "1rem",
                                    minHeight: "1rem",
                                    height: "1rem",
                                    _disabled: { color: "neutral/50" },
                                }),
                                variant === "primary"
                                    ? css({ color: "white" })
                                    : ((styles as typeof variantStyles.outline.colors.neutral).rightIcon ??
                                          styles.icon),
                            ),
                            strokeWidth: 1.75,
                        })
                    )}
                </div>
            )}
        </div>
    )
}
