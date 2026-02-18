import { Button, CircularLoader } from "@arrhes/ui"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { IconCheck, IconChevronDown } from "@tabler/icons-react"
import { type ComponentProps, useEffect, useState } from "react"
import type { FieldError } from "react-hook-form"
import { debounce } from "../../utilities/debounce.js"
import { FormatNull } from "../formats/formatNull.js"
import { Virtualizer } from "../layouts/virtualizer.js"
import { Popover } from "../overlays/popover/popover.js"
import { InputText } from "./inputText.js"

export function InputCombobox<TValue extends string>(props: {
    error?: FieldError
    placeholder?: string
    value?: TValue | null
    defaultValue?: TValue | null
    onChange: (value?: TValue | null) => void
    options: Array<{
        key: TValue
        label: string
    }>
    isLoading?: boolean
    isDisabled?: boolean
    autoFocus?: boolean
    className?: ComponentProps<"div">["className"]
    allowEmpty?: boolean
}) {
    const [open, setOpen] = useState(false)
    const [rawQuery, setRawQuery] = useState<string | null | undefined>(undefined)
    const [currentOptions, setCurrentOptions] = useState(props.options)
    const currentOption = props.options?.find((x) => x.key === (props.value ?? props.defaultValue))

    useEffect(() => {
        debounce({
            function: () => {
                setCurrentOptions(props.options.filter((x) => {
                    rawQuery !== null
                        && rawQuery !== undefined
                        && x.label.toLowerCase().includes(rawQuery.toLowerCase())
                }))
            },
        })
    }, [rawQuery, props.options.filter])

    return (
        <Popover.Root open={open} onOpenChange={setOpen} modal>
            <Popover.Trigger asChild>
                <Button
                    role="combobox"
                    onClick={() => {
                        if (props.isDisabled) return
                        setOpen(!open)
                    }}
                    data-open={open}
                    className={cx(
                        css({ width: "100%" }),
                        props.isDisabled ? css({ cursor: "not-allowed" }) : "",
                        props.className,
                    )}
                    autoFocus={props.autoFocus}
                    isDisabled={props.isDisabled}
                >
                    <div
                        className={cx(
                            css({
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "0.5rem",
                                borderRadius: "md",
                                padding: "0.5rem",
                                border: "1px solid",
                                boxSizing: "border-box",
                                _hover: { borderColor: "neutral/50" },
                                _focusWithin: { borderColor: "neutral/50", boxShadow: "inset" },
                            }),
                            props.error === undefined
                                ? css({ borderColor: "neutral/20" })
                                : css({ borderColor: "error" }),
                            props.className,
                        )}
                    >
                        <span
                            className={cx(
                                css({
                                    fontSize: "0.875rem",
                                    lineHeight: "1rem",
                                    fontWeight: "400",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    textAlign: "left",
                                }),
                                currentOption === undefined ? css({ color: "neutral/50" }) : css({ color: "neutral" }),
                            )}
                        >
                            {currentOption === undefined
                                ? (props.placeholder ?? "Veuiller choisir une option")
                                : currentOption.label}
                        </span>
                        <IconChevronDown
                            size={16}
                            className={css({
                                flexShrink: 0,
                                stroke: "neutral/50",
                                minWidth: "1rem",
                                width: "1rem",
                                minHeight: "1rem",
                                height: "1rem",
                            })}
                            strokeWidth={1.75}
                        />
                    </div>
                </Button>
            </Popover.Trigger>
            {open === false
                ? null
                : (
                    <Popover.Content align="start">
                        <InputText
                            value={rawQuery}
                            onChange={(value) => setRawQuery(value)}
                        />
                        <div
                            className={css({
                                height: "fit-content",
                                maxHeight: "256px",
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "start",
                            })}
                        >
                            {props.isLoading === false ? null : <CircularLoader />}
                            {props.options.length > 0 ? null : (
                                <FormatNull text="Pas de résultat" className={css({ padding: "1rem" })} />
                            )}
                            <Virtualizer data={currentOptions}>
                                {(option) => {
                                    return (
                                        <div
                                            key={option.key}
                                            onClick={() => {
                                                if (props.isDisabled) return
                                                if (props.allowEmpty === true && option.key === props.value) {
                                                    props.onChange(undefined)
                                                    setOpen(false)
                                                    return
                                                }
                                                props.onChange(option.key)
                                                setOpen(false)
                                            }}
                                            className={cx(
                                                css({
                                                    width: "100%",
                                                    height: "fit-content",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    gap: "2",
                                                    padding: "1rem",
                                                    cursor: "pointer",
                                                }),
                                                currentOption?.key === option.key
                                                    ? css({ backgroundColor: "background" })
                                                    : css({
                                                        backgroundColor: "none",
                                                        _hover: { backgroundColor: "neutral/5" },
                                                    }),
                                            )}
                                        >
                                            <span className={css({ color: "neutral", fontSize: "sm" })}>
                                                {option.label}
                                            </span>
                                            <IconCheck
                                                size={16}
                                                className={cx(
                                                    css({ stroke: "neutral" }),
                                                    currentOption?.key === option.key
                                                        ? css({ opacity: "100" })
                                                        : css({ opacity: "0" }),
                                                )}
                                            />
                                        </div>
                                    )
                                }}
                            </Virtualizer>
                        </div>
                    </Popover.Content>
                )}
        </Popover.Root>
    )
}
