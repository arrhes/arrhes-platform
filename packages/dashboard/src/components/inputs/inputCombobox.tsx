
import { Button } from "@arrhes/ui"
import { FormatNull } from "../../components/formats/formatNull.js"
import { CircularLoader } from "../../components/layouts/circularLoader.js"
import { Virtualizer } from "../../components/layouts/virtualizer.js"
import { Popover } from "../../components/overlays/popover/popover.js"
import { css, cx } from "../../utilities/cn.js"
import { debounce } from "../../utilities/debounce.js"
import { IconCheck, IconChevronDown } from "@tabler/icons-react"
import { ComponentProps, useEffect, useState } from "react"
import { FieldError } from "react-hook-form"


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
    className?: ComponentProps<'div'>['className']
    allowEmpty?: boolean
}) {
    const [open, setOpen] = useState(false)
    const [rawQuery, setRawQuery] = useState<string>("")
    const [currentOptions, setCurrentOptions] = useState(props.options)
    const currentOption = props.options?.find(x => (x.key === (props.value ?? props.defaultValue)))

    useEffect(() => {
        debounce({
            function: () => {
                setCurrentOptions(props.options.filter(x => x.label.toLowerCase().includes(rawQuery.toLowerCase())))
            }
        })
    }, [rawQuery])

    return (
        <Popover.Root
            open={open}
            onOpenChange={setOpen}
            modal
        >
            <Popover.Trigger asChild>
                <Button
                    role="combobox"
                    onClick={() => {
                        if (props.isDisabled) return
                        setOpen(!open)
                    }}
                    data-open={open}
                    className={cx(
                        css({ w: "full" }),
                        props.isDisabled ? css({ cursor: "not-allowed" }) : "",
                        props.className
                    )}
                    autoFocus={props.autoFocus}
                    disabled={props.isDisabled}
                >
                    <div className={cx(
                        css({
                            w: "full",
                            h: "[32px]",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "2",
                            rounded: "sm",
                            p: "2",
                            border: "1px solid",
                            _hover: { shadow: "inner" },
                            _focusWithin: { borderColor: "neutral/50", shadow: "inner" }
                        }),
                        (props.error === undefined) ? css({ borderColor: "neutral/25" }) : css({ borderColor: "error" }),
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
                                (currentOption === undefined) ? css({ color: "neutral/50" }) : css({ color: "neutral" })
                            )}
                        >
                            {currentOption === undefined
                                ? props.placeholder ?? "Veuiller choisir une option"
                                : currentOption.label
                            }
                        </span>
                        <IconChevronDown
                            size={16}
                            className={css({ stroke: "neutral", minW: "[16px]", w: "[16px]", minH: "[16px]", h: "[16px]" })}
                            strokeWidth={2}
                        />
                    </div>
                </Button>
            </Popover.Trigger>
            {
                (open === false)
                    ? (null)
                    : (
                        <Popover.Content align="start">
                            <div className={css({ w: "full", h: "[32px]", display: "flex", justifyContent: "flex-start", alignItems: "center", p: "2", borderBottom: "1px solid", borderColor: "neutral/10" })}>
                                <input
                                    type="text"
                                    className={css({
                                        w: "full",
                                        fontSize: "sm",
                                        lineHeight: "none",
                                        _placeholder: { color: "neutral/25" }
                                    })}
                                    value={rawQuery}
                                    onChange={(e) => setRawQuery(e.currentTarget.value)}
                                />
                            </div>
                            <div className={css({ h: "fit-content", maxH: "[256px]", w: "full", display: "flex", flexDir: "column", justifyContent: "flex-start", alignItems: "flex-start" })}>
                                {
                                    (props.isLoading === false)
                                        ? (null)
                                        : (
                                            <CircularLoader />
                                        )
                                }
                                {
                                    (props.options.length > 0)
                                        ? (null)
                                        : (
                                            <FormatNull
                                                text="Pas de résultat"
                                                className={css({ p: "2" })}
                                            />
                                        )
                                }
                                <Virtualizer
                                    data={currentOptions}
                                >
                                    {(option) => {
                                        return (
                                            <div
                                                key={option.key}
                                                onClick={() => {
                                                    if (props.isDisabled) return
                                                    if ((props.allowEmpty === true) && (option.key === props.value)) {
                                                        props.onChange(undefined)
                                                        setOpen(false)
                                                        return
                                                    }
                                                    props.onChange(option.key)
                                                    setOpen(false)
                                                }}
                                                className={cx(
                                                    css({
                                                        w: "full",
                                                        h: "fit-content",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        gap: "2",
                                                        p: "2",
                                                        cursor: "pointer"
                                                    }),
                                                    (currentOption?.key === option.key) ? css({ bg: "neutral/5" }) : css({ bg: "none", _hover: { bg: "neutral/5" } })
                                                )}
                                            >
                                                <span
                                                    className={css({ color: "neutral" })}
                                                >
                                                    {option.label}
                                                </span>
                                                <IconCheck
                                                    size={16}
                                                    className={cx(
                                                        css({ stroke: "neutral" }),
                                                        currentOption?.key === option.key ? css({ opacity: "100" }) : css({ opacity: "0" })
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
