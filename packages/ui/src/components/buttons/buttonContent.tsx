import type { Icon, IconProps } from "@tabler/icons-react"
import { cloneElement, type ReactElement } from "react"
import { css, cx } from "../../utilities/cn.ts"
import { CircularLoader } from "../layouts/circularLoader"


// Color variants available for all button styles (GitHub Primer inspired)
// Includes legacy aliases for backward compatibility: error->danger, warning->neutral, information->neutral
export type ButtonColor = "neutral" | "danger" | "success" | "error" | "warning" | "information"

// Map legacy colors to new colors
const colorMap: Record<ButtonColor, "neutral" | "danger" | "success"> = {
    neutral: "neutral",
    danger: "danger",
    success: "success",
    error: "danger",      // legacy alias
    warning: "neutral",   // legacy alias (maps to neutral)
    information: "neutral", // legacy alias (maps to neutral)
}

// Button style variants (GitHub Primer inspired)
export type ButtonVariant = "default" | "primary" | "outline" | "invisible"

// Button sizes (GitHub Primer inspired)
export type ButtonSize = "small" | "medium" | "large"


export type ButtonContentProps = {
    variant?: ButtonVariant
    color?: ButtonColor
    size?: ButtonSize
    text?: string
    title?: string
    icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    rightIcon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    isLoading?: boolean
    disabled?: boolean
    isActive?: boolean
    className?: string
}

// Size configurations
const sizeStyles = {
    small: {
        height: "28px",
        padding: "0 8px",
        fontSize: "12px",
        iconSize: 14,
        gap: "4px",
    },
    medium: {
        height: "32px",
        padding: "0 12px",
        fontSize: "14px",
        iconSize: 16,
        gap: "6px",
    },
    large: {
        height: "40px",
        padding: "0 16px",
        fontSize: "14px",
        iconSize: 20,
        gap: "8px",
    },
}

// GitHub Primer-inspired style configurations
const variantStyles = {
    // Primary: Green background, white text (like GitHub's primary action)
    primary: {
        base: css({
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "rgba(31, 35, 40, 0.15)",
            bg: "success",
            color: "white",
            fontWeight: "medium",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
            _hover: {
                bg: "#2da44e",
                filter: "brightness(0.95)",
            },
            _active: {
                bg: "#298e46",
            },
        }),
        colors: {
            neutral: {
                container: css({}),
                icon: css({ color: "white" }),
                text: css({ color: "white" }),
            },
            danger: {
                container: css({
                    bg: "error",
                    borderColor: "rgba(31, 35, 40, 0.15)",
                    _hover: { bg: "#c2341f" },
                    _active: { bg: "#a22015" },
                }),
                icon: css({ color: "white" }),
                text: css({ color: "white" }),
            },
            success: {
                container: css({}),
                icon: css({ color: "white" }),
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
                icon: css({ color: "neutral" }),
                text: css({ color: "neutral" }),
            },
            danger: {
                container: css({
                    _hover: { bg: "error/5", borderColor: "error/30" },
                }),
                icon: css({ color: "error" }),
                text: css({ color: "error" }),
            },
            success: {
                container: css({
                    _hover: { bg: "success/5", borderColor: "success/30" },
                }),
                icon: css({ color: "success" }),
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
                icon: css({ color: "neutral" }),
                rightIcon: css({ color: "neutral/50" }),
                text: css({ color: "neutral" }),
            },
            danger: {
                container: css({
                    borderColor: "error/40",
                    _hover: { bg: "error/5", borderColor: "error/50" },
                }),
                icon: css({ color: "error" }),
                rightIcon: css({ color: "error/50" }),
                text: css({ color: "error" }),
            },
            success: {
                container: css({
                    borderColor: "success/40",
                    _hover: { bg: "success/5", borderColor: "success/50" },
                }),
                icon: css({ color: "success" }),
                rightIcon: css({ color: "success/50" }),
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
                bg: "neutral/8",
            },
            _active: {
                bg: "neutral/12",
            },
        }),
        colors: {
            neutral: {
                container: css({}),
                icon: css({ color: "neutral/70" }),
                text: css({ color: "neutral/70" }),
            },
            danger: {
                container: css({
                    _hover: { bg: "error/8" },
                }),
                icon: css({ color: "error" }),
                text: css({ color: "error" }),
            },
            success: {
                container: css({
                    _hover: { bg: "success/8" },
                }),
                icon: css({ color: "success" }),
                text: css({ color: "success" }),
            },
        },
    },
}

/**
 * ButtonContent renders the visual content of a button (icon, text, loader)
 * Styled to match GitHub's Primer design system
 * Can be used standalone or wrapped by Button/Link for click handling
 */
export function ButtonContent(props: ButtonContentProps) {
    const variant = props.variant ?? "default"
    const rawColor = props.color ?? "neutral"
    const color = colorMap[rawColor] // Map legacy colors
    const size = props.size ?? "medium"
    const sizeConfig = sizeStyles[size]
    const styles = variantStyles[variant].colors[color]

    const baseContainerStyles = css({
        width: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "md",
        boxSizing: "border-box",
        cursor: "pointer",
        transition: "all 0.1s ease-in-out",
        _disabled: { opacity: 0.5, cursor: "not-allowed" },
    })

    const sizeContainerStyles = css({
        height: sizeConfig.height,
        padding: sizeConfig.padding,
        gap: sizeConfig.gap,
        fontSize: sizeConfig.fontSize,
    })

    const iconOnlyStyles = props.text === undefined
        ? css({
            width: sizeConfig.height,
            padding: "0",
            justifyContent: "center"
        })
        : ""

    const iconBaseStyles = css({
        minWidth: `${sizeConfig.iconSize}px`,
        width: `${sizeConfig.iconSize}px`,
        minHeight: `${sizeConfig.iconSize}px`,
        height: `${sizeConfig.iconSize}px`,
        flexShrink: 0,
    })

    const textBaseStyles = css({
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        lineHeight: "1",
    })

    const textActiveStyles = props.isActive
        ? css({ fontWeight: "bold" })
        : ""

    return (
        <div
            title={props.title ?? props.text}
            aria-disabled={props.disabled || props.isLoading}
            className={cx(
                baseContainerStyles,
                sizeContainerStyles,
                iconOnlyStyles,
                variantStyles[variant].base,
                styles.container,
                props.className
            )}
        >
            {/* Loading spinner */}
            {props.isLoading && (
                <CircularLoader
                    size={sizeConfig.iconSize}
                    className={cx(
                        iconBaseStyles,
                        variant === "primary" ? css({ stroke: "white" }) : styles.icon
                    )}
                />
            )}

            {/* Left icon */}
            {props.icon && !props.isLoading && cloneElement(props.icon, {
                "aria-disabled": props.disabled,
                size: sizeConfig.iconSize,
                className: cx(
                    iconBaseStyles,
                    variant === "primary"
                        ? css({ color: "white", _disabled: { color: "white/50" } })
                        : styles.icon
                ),
                strokeWidth: 1.75
            })}

            {/* Text label */}
            {props.text && (
                <span
                    aria-disabled={props.disabled || props.isLoading}
                    className={cx(
                        textBaseStyles,
                        textActiveStyles,
                        variant === "primary"
                            ? css({ color: "white", _disabled: { opacity: 0.5 } })
                            : cx(styles.text, css({ _disabled: { color: "neutral/50" } }))
                    )}
                >
                    {props.text}
                </span>
            )}

            {/* Right icon */}
            {props.rightIcon && (
                <div className={css({ display: "flex", alignItems: "center", justifyContent: "center" })}>
                    {props.isLoading ? (
                        <CircularLoader
                            size={sizeConfig.iconSize - 4}
                            className={cx(
                                css({
                                    minWidth: `${sizeConfig.iconSize - 4}px`,
                                    width: `${sizeConfig.iconSize - 4}px`,
                                    minHeight: `${sizeConfig.iconSize - 4}px`,
                                    height: `${sizeConfig.iconSize - 4}px`
                                }),
                                variant === "primary" ? css({ stroke: "white" }) : styles.icon
                            )}
                        />
                    ) : (
                        cloneElement(props.rightIcon, {
                            "aria-disabled": props.disabled,
                            size: sizeConfig.iconSize - 4,
                            className: cx(
                                css({
                                    minWidth: `${sizeConfig.iconSize - 4}px`,
                                    width: `${sizeConfig.iconSize - 4}px`,
                                    minHeight: `${sizeConfig.iconSize - 4}px`,
                                    height: `${sizeConfig.iconSize - 4}px`,
                                    _disabled: { color: "neutral/50" },
                                }),
                                variant === "primary"
                                    ? css({ color: "white" })
                                    : (styles as typeof variantStyles.outline.colors.neutral).rightIcon ?? styles.icon
                            ),
                            strokeWidth: 1.75
                        })
                    )}
                </div>
            )}
        </div>
    )
}
