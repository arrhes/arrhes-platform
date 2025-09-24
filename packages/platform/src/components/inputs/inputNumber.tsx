import { InputHTMLAttributes } from "react"
import { FieldError } from "react-hook-form"
import { IMask, IMaskInput } from 'react-imask'
import { cn } from "utilities/cn"


export function InputPrice(props:
    & Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "value" | "onChange">
    & {
        error?: FieldError
        defaultValue?: string | undefined | null
        value?: string | undefined | null
        onChange: (value: string | undefined) => void
    }
) {

    function input(value: string | undefined | null) {
        if (value === null || value === undefined) return undefined
        return value
    }

    function output(value: string | undefined) {
        if (value === undefined) return value
        return value
    }

    return (
        <div className={cn(
            "h-[32px] w-full flex justify-start items-stretch border border-neutral/20 rounded-sm",
            (!props.error) ? "" : "border-error",
            props.className
        )}>
            <IMaskInput
                // inputRef={props.ref}
                mask="n"
                blocks={{
                    n: {
                        mask: IMask.MaskedNumber,
                        // from: 0,
                        scale: 2
                    }
                }}
                autofix={false}
                lazy={false}
                overwrite={false}
                eager="append"
                unmask={"typed"}
                // onClick={(event) => { event.currentTarget.select() }}
                // onFocus={(event) => { event.currentTarget.setSelectionRange(-1, -1) }}
                onAccept={(value) => props.onChange(output(value))}
                value={input(props.value)}
                className={cn(
                    "rounded-[inherit] w-full text-base placeholder:text-neutral/25 p-2",
                    "focus:shadow-inner focus:bg-neutral/5",
                    "overflow-hidden whitespace-nowrap text-ellipsis"
                )}
                inputMode="decimal"
            />
        </div>

    )
}
