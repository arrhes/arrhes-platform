import type { Icon, IconProps } from "@tabler/icons-react"
import { cloneElement, type ReactElement } from "react"
import { css, cx } from "../../utilities/cn.ts"
import { CircularLoader } from "../layouts/circularLoader"
import { useButtonLoading } from "./button"

export type ButtonColor = "neutral" | "danger" | "success"

export type ButtonContentProps = {
    color?: ButtonColor
    text?: string
    title?: string
    leftIcon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    rightIcon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    isLoading?: boolean
    isDisabled?: boolean
    isActive?: boolean
    className?: string
}

export function renderButtonContent(
    props: ButtonContentProps,
    classes: Partial<Record<"container" | "leftIcon" | "text" | "rightIcon", string>>,
) {
    const contextLoading = useButtonLoading()
    const isLoading = props.isLoading ?? contextLoading

    const iconOnlyStyles =
        props.text === undefined
            ? css({
                width: "auto",
                justifyContent: "center",
            })
            : ""

    const activeContainerStyles = props.isActive ? css({ backgroundColor: "neutral/5" }) : ""
    const activeLeftIconStyles = props.isActive ? css({ color: "primary" }) : ""
    const activeTextStyles = props.isActive ? css({ color: "primary" }) : ""

    return (
        <div
            title={props.title ?? props.text}
            aria-current={props.isActive || isLoading}
            aria-disabled={props.isDisabled || isLoading}
            className={cx(classes.container, iconOnlyStyles, activeContainerStyles, props.className)}
        >
            {props.leftIcon &&
                !isLoading &&
                cloneElement(props.leftIcon, {
                    "aria-disabled": props.isDisabled,
                    size: 16,
                    className: cx(classes.leftIcon, activeLeftIconStyles),
                    strokeWidth: 1.75,
                })}

            {props.text && (
                <span aria-disabled={props.isDisabled || isLoading} className={cx(classes.text, activeTextStyles)}>
                    {props.text}
                </span>
            )}

            {props.rightIcon && (
                <div className={css({ display: "flex", alignItems: "center", justifyContent: "center" })}>
                    {isLoading ? (
                        <CircularLoader size={16 - 4} className={classes.rightIcon} />
                    ) : (
                        cloneElement(props.rightIcon, {
                            "aria-disabled": props.isDisabled,
                            size: 16 - 4,
                            className: cx(classes.rightIcon, css({ _disabled: { color: "neutral/50" } })),
                            strokeWidth: 1.75,
                        })
                    )}
                </div>
            )}
        </div>
    )
}
