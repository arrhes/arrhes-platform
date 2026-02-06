import { type ComponentProps, type MouseEvent, type ReactNode, useState } from "react"
import { css, cx } from "../../utilities/cn.ts"
import { sleep } from "../../utilities/sleep.ts"
import { type ButtonContentProps, ButtonContent } from "./buttonContent"


export type ButtonProps = Omit<ComponentProps<"button">, "color">
    & ButtonContentProps
    & {
        hasLoader?: boolean
        children?: ReactNode
    }

/**
 * Button component with loading state handling and variant support
 * Styled to match GitHub's Primer design system
 * Combines button behavior with ButtonContent visual styles
 * Can render children directly or use ButtonContent for structured content
 */
export function Button(props: ButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

    async function handleClick(e: MouseEvent<HTMLButtonElement>) {
        if (props.onClick === undefined) return
        if (props.hasLoader === false) return props.onClick(e)

        setIsLoading(true)
        await Promise.all([sleep(100), props.onClick(e)])
        setIsLoading(false)

        e.preventDefault()
    }

    // Extract content props from button props
    const {
        variant, color, size, text, icon, rightIcon, isActive,
        hasLoader, className, disabled, title, children,
        ...buttonProps
    } = props

    // If children are provided, render them directly instead of ButtonContent
    const hasChildren = children !== undefined

    return (
        <button
            {...buttonProps}
            className={cx(
                css({
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    cursor: "pointer",
                    width: "fit-content",
                    maxWidth: "100%",
                    height: "fit-content",
                    maxHeight: "fit-content",
                    bg: "transparent",
                    border: "none",
                    padding: "0",
                    _disabled: { cursor: "not-allowed" },
                }),
                className
            )}
            onClick={handleClick}
            type={props.type ?? "button"}
            disabled={disabled || isLoading}
            title={title ?? text}
        >
            {hasChildren ? children : (
                <ButtonContent
                    variant={variant}
                    color={color}
                    size={size}
                    text={text}
                    title={title ?? text}
                    icon={icon}
                    rightIcon={rightIcon}
                    isLoading={hasLoader !== false ? isLoading : undefined}
                    disabled={disabled}
                    isActive={isActive}
                />
            )}
        </button>
    )
}
