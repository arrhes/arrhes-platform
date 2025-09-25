
import { Button } from "#/components/buttons/button.js"
import { FormatNull } from "#/components/formats/formatNull.js"
import { CircularLoader } from "#/components/layouts/circularLoader.js"
import { Virtualizer } from "#/components/layouts/virtualizer.js"
import { Popover } from "#/components/overlays/popover/popover.js"
import { cn } from "#/utilities/cn.js"
import { debounce } from "#/utilities/debounce.js"
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
                    className={cn(
                        "w-full group",
                        props.isDisabled ? "cursor-not-allowed" : "",
                        props.className
                    )}
                    autoFocus={props.autoFocus}
                    disabled={props.isDisabled}
                >
                    <div className={cn(
                        "w-full h-[32px] flex justify-between items-center gap-2 rounded-sm p-2 border border-solid",
                        "hover:shadow-inner",
                        "focus-within:border-neutral/50 focus-within:shadow-inner",
                        (props.error === undefined) ? "border-neutral/25" : "border-error",
                        props.className
                    )}>
                        <span
                            className={cn(
                                "w-full h-full text-sm font-medium leading-none whitespace-nowrap text-ellipsis rounded-sm text-left",
                                (currentOption === undefined) ? "text-neutral/50" : "text-neutral"
                            )}
                        >
                            {currentOption === undefined
                                ? props.placeholder ?? "Veuiller choisir une option"
                                : currentOption.label
                            }
                        </span>
                        <IconChevronDown
                            size={16}
                            className="stroke-neutral min-w-[16px] w-[16px] min-h-[16px] h-[16px]"
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
                            <div className="w-full h-[32px] flex justify-start items-center p-2 border-b border-b-neutral/10">
                                <input
                                    type="text"
                                    className={cn(
                                        "w-full text-sm leading-none placeholder:text-neutral/25",
                                    )}
                                    value={rawQuery}
                                    onChange={(e) => setRawQuery(e.currentTarget.value)}
                                />
                            </div>
                            <div className='h-fit max-h-[256px] w-full flex flex-col justify-start items-start'>
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
                                                className="p-2"
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
                                                className={cn(
                                                    "w-full h-fit flex justify-between items-center gap-2 p-2 cursor-pointer",
                                                    (currentOption?.key === option.key) ? "bg-neutral/5" : "bg-none hover:bg-neutral/5"
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        currentOption?.key === option.key ? "text-neutral" : "text-neutral"
                                                    )}
                                                >
                                                    {option.label}
                                                </span>
                                                <IconCheck
                                                    size={16}
                                                    className={cn(
                                                        "stroke-neutral",
                                                        currentOption?.key === option.key ? "opacity-100" : "opacity-0"
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
