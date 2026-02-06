import { Button } from "@arrhes/ui"
import { FormatNull } from "../../components/formats/formatNull.js"
import { CircularLoader } from "../../components/layouts/circularLoader.js"
import { Popover } from "../../components/overlays/popover/popover.js"
import { css, cx } from "../../utilities/cn.js"
import { IconCheck, IconChevronDown } from "@tabler/icons-react"
import { InputHTMLAttributes, useState } from 'react'
import { FieldError } from 'react-hook-form'


export function InputSelect<TValue extends string>(props:
    & Omit<InputHTMLAttributes<HTMLSelectElement>, "value" | "onChange">
    & {
        error?: FieldError
        value?: TValue | null
        defaultValue?: TValue | null
        onChange?: (value?: TValue | null | undefined) => void
        options: Array<{
            key: TValue
            label: string
        }> | undefined
        autoFocus?: boolean
        allowEmpty?: boolean
        isDisabled?: boolean
        isLoading?: boolean
    }
) {
    const [open, setOpen] = useState(false)

    function input(value: TValue | null | undefined) {
        return value
    }

    function output(value: TValue | undefined | null) {
        if (!value) return null
        return value
    }

    const currentOption = props.options?.find(x => x.key === input(props.value ?? props.defaultValue))
    return (
        <Popover.Root
            open={open}
            onOpenChange={setOpen}
        >
            <Popover.Trigger asChild>
                <Button
                    autoFocus={props.autoFocus}
                    onClick={() => {
                        if (props.isDisabled === true) return
                        setOpen(!open)
                    }}
                    className={cx(
                        css({ w: "full" }),
                        "group",
                        css(props.isDisabled ? { cursor: "not-allowed" } : {}),
                        props.className
                    )}
                    data-open={open}
                >
                    <div className={cx(
                        css({
                            w: "full",
                            h: "32px",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "2",
                            rounded: "sm",
                            p: "2",
                            border: "1px solid",
                            _hover: { shadow: "inset" },
                            _focusWithin: { borderColor: "neutral/50", shadow: "inset" }
                        }),
                        css(props.error ? { borderColor: "error" } : { borderColor: "neutral/25" }),
                        props.className
                    )}>
                        <span
                            className={cx(
                                css({
                                    w: "full",
                                    h: "full",
                                    fontSize: "sm",
                                    fontWeight: "medium",
                                    lineHeight: "none",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    rounded: "sm",
                                    textAlign: "left"
                                }),
                                css(currentOption === undefined ? { color: "neutral/50" } : { color: "neutral" })
                            )}
                        >
                            {currentOption === undefined
                                ? props.placeholder ?? "Veuiller choisir une option"
                                : currentOption.label
                            }
                        </span>
                        <IconChevronDown
                            size={16}
                            className={css({
                                stroke: "neutral",
                                minW: "16px",
                                w: "16px",
                                minH: "16px",
                                h: "16px"
                            })}
                            strokeWidth={2}
                        />
                    </div>
                </Button>
            </Popover.Trigger>
            <Popover.Content
                align="start"
            >
                <div className={css({
                    minH: "32px",
                    maxH: "256px",
                    overflow: "auto",
                    w: "full",
                    p: "2",
                    display: "flex",
                    flexDir: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "1"
                })}>
                    {
                        (props.isLoading === true)
                            ? (
                                <CircularLoader
                                    text="Chargement des options..."
                                />
                            )
                            : (props.options === undefined || props.options.length === 0)
                                ? (
                                    <FormatNull
                                        text="Pas d'options"
                                    />
                                )
                                : props.options.map((option) => (
                                    <div
                                        key={option.key}
                                        onClick={() => {
                                            if (props.isDisabled === true) return
                                            if (props.onChange === undefined) return
                                            if ((props.allowEmpty === true) && (option.key === props.value)) {
                                                props.onChange(undefined)
                                                setOpen(false)
                                                return
                                            }
                                            props.onChange(output(option.key))
                                            setOpen(false)
                                        }}
                                        className={cx(
                                            css({
                                                position: "relative",
                                                w: "full",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                gap: "2",
                                                p: "2",
                                                rounded: "sm",
                                                border: "1px solid transparent",
                                                cursor: "pointer"
                                            }),
                                            css(option.key === props.value
                                                ? { bg: "neutral/5", borderColor: "neutral/5" }
                                                : { bg: "none", _hover: { bg: "neutral/5", borderColor: "neutral/5" } }
                                            )
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                css({
                                                    fontSize: "sm",
                                                    lineHeight: "none",
                                                    fontWeight: "medium"
                                                }),
                                                css(option.key === props.value ? { color: "neutral" } : {})
                                            )}
                                        >
                                            {option.label}
                                        </span>
                                        <IconCheck
                                            className={cx(
                                                css({
                                                    minW: "16px",
                                                    w: "16px",
                                                    minH: "16px",
                                                    h: "16px",
                                                    color: "neutral"
                                                }),
                                                css(option.key === props.value
                                                    ? { opacity: "1", strokeWidth: "2" }
                                                    : { opacity: "0" }
                                                )
                                            )}
                                        />
                                    </div>
                                ))
                    }
                </div>
            </Popover.Content>
        </Popover.Root>
    )
}
