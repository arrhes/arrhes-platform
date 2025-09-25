import { Button } from "#/components/buttons/button.js"
import { FormatNull } from "#/components/formats/formatNull.js"
import { CircularLoader } from "#/components/layouts/circularLoader.js"
import { Popover } from "#/components/overlays/popover/popover.js"
import { cn } from "#/utilities/cn.js"
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
                {/* <ButtonGhost
                    autoFocus={props.autoFocus}
                    onClick={() => {
                        if (props.isDisabled === true) return
                        setOpen(!open)
                    }}
                    className={cn(
                        "w-fit group",
                        props.isDisabled ? "cursor-not-allowed" : "",
                        props.className
                    )}
                    data-open={open}
                    icon={<IconAdjustmentsHorizontal />}
                    text="Filter" 
                />*/}
                <Button
                    autoFocus={props.autoFocus}
                    onClick={() => {
                        if (props.isDisabled === true) return
                        setOpen(!open)
                    }}
                    className={cn(
                        "w-full group",
                        props.isDisabled ? "cursor-not-allowed" : "",
                        props.className
                    )}
                    data-open={open}
                >
                    <div className={cn(
                        "w-full h-[32px] flex justify-start items-center gap-2 rounded-sm p-2 border border-solid",
                        "hover:shadow-inner",
                        "focus-within:border-neutral/50 focus-within:shadow-inner",
                        (!props.error) ? "border-neutral/25" : "border-error",
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
            <Popover.Content
                align="start"
            >
                <div className="min-h-[32px] max-h-[256px] overflow-auto w-full p-2 flex flex-col justify-start items-start gap-1">
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
                                        className={cn(
                                            "relative w-full flex justify-between items-center gap-2 p-2 rounded-sm border border-transparent cursor-pointer",
                                            (option.key === props.value) ? "bg-neutral/5 border-neutral/5" : "bg-none hover:bg-neutral/5 hover:border-neutral/5"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "text-sm leading-none font-medium",
                                                (option.key === props.value) ? "text-neutral" : ""
                                            )}
                                        >
                                            {option.label}
                                        </span>
                                        <IconCheck
                                            className={cn(
                                                "min-w-[16px] w-[16px] min-h-[16px] h-[16px] text-neutral",
                                                (option.key === props.value) ? "opacity-100 stroke-2" : "opacity-0"
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
