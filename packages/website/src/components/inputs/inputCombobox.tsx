import { Button } from "@arrhes/ui"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { IconCheck, IconChevronDown } from "@tabler/icons-react"
import { type ComponentProps, useEffect, useState } from "react"
import type { FieldError } from "react-hook-form"
import { debounce } from "../../utilities/debounce.js"
import { FormatNull } from "../formats/formatNull.js"
import { CircularLoader } from "../layouts/circularLoader.js"
import { Virtualizer } from "../layouts/virtualizer.js"
import { Popover } from "../overlays/popover/popover.js"

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
    const [rawQuery, setRawQuery] = useState<string>("")
    const [currentOptions, setCurrentOptions] = useState(props.options)
    const currentOption = props.options?.find((x) => x.key === (props.value ?? props.defaultValue))

    useEffect(() => {
        debounce({
            function: () => {
                setCurrentOptions(props.options.filter((x) => x.label.toLowerCase().includes(rawQuery.toLowerCase())))
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
                                height: "[32px]",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "2",
                                borderRadius: "sm",
                                padding: "1rem",
                                border: "1px solid",
                                _hover: { boxShadow: "inner" },
                                _focusWithin: { borderColor: "neutral/50", boxShadow: "inner" },
                            }),
                            props.error === undefined
                                ? css({ borderColor: "neutral/25" })
                                : css({ borderColor: "error" }),
                            props.className,
                        )}
                    >
                        <span
                            className={cx(
                                css({
                                    width: "100%",
                                    height: "100%",
                                    fontSize: "sm",
                                    fontWeight: "medium",
                                    lineHeight: "none",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    borderRadius: "sm",
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
                                stroke: "neutral",
                                minWidth: "[16px]",
                                width: "[16px]",
                                minH: "[16px]",
                                height: "[16px]",
                            })}
                            strokeWidth={2}
                        />
                    </div>
                </Button>
            </Popover.Trigger>
            {open === false ? null : (
                <Popover.Content align="start">
                    <div
                        className={css({
                            width: "100%",
                            height: "[32px]",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            padding: "1rem",
                            borderBottom: "1px solid",
                            borderColor: "neutral/10",
                        })}
                    >
                        <input
                            type="text"
                            className={css({
                                width: "100%",
                                fontSize: "sm",
                                lineHeight: "none",
                                _placeholder: { color: "neutral/25" },
                            })}
                            value={rawQuery}
                            onChange={(e) => setRawQuery(e.currentTarget.value)}
                        />
                    </div>
                    <div
                        className={css({
                            height: "fit-content",
                            maxH: "[256px]",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
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
                                                ? css({ backgroundColor: "neutral/5" })
                                                : css({
                                                      backgroundColor: "none",
                                                      _hover: { backgroundColor: "neutral/5" },
                                                  }),
                                        )}
                                    >
                                        <span className={css({ color: "neutral" })}>{option.label}</span>
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
