import { InputHTMLAttributes } from "react"
import { FieldError } from "react-hook-form"
import { IMask, IMaskInput } from "react-imask"
import { cn } from "utilities/cn"


export function InputDate(props:
    & Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "value" | "onChange">
    & {
        error?: FieldError
        defaultValue?: string | undefined | null
        value?: string | undefined | null
        onChange: (value: string | undefined) => void
    }
) {

    function input(value: string | undefined | null) {
        if (!value) return undefined
        if (String(new Date(value)) === "Invalid Date") return undefined

        let date = new Date(value)
        let day = String(date.getDate())
        let month = String(date.getMonth() + 1)
        let year = String(date.getFullYear())

        if (date.getDate() < 10) day = "0" + day
        if ((date.getMonth() + 1) < 10) month = "0" + month
        return [day, month, year].join(' / ')
    }

    function output(value: string | undefined) {
        if (!value) return undefined
        const yearMonthDay = value.split(' / ')
        return new Date(Number(yearMonthDay[2]), Number(yearMonthDay[1]) - 1, Number(yearMonthDay[0]), 12, 0, 0)?.toISOString()
    }

    return (
        <div
            className={cn(
                "h-[32px] w-full flex justify-start items-stretch gap-2 border border-neutral/20 rounded-sm",
                "focus-within:border-neutral/50 focus-within:shadow-inner",
                (!props.error) ? "" : "border-error",
                props.className
            )}
        >
            <IMaskInput
                // inputRef={ref}
                mask="d{ / }`m{ / }`Y"
                blocks={{
                    d: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 31,
                        maxLength: 2,
                        placeholderChar: "J"
                    },
                    m: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 12,
                        maxLength: 2,
                        placeholderChar: "M"
                    },
                    Y: {
                        mask: IMask.MaskedRange,
                        from: 1930,
                        to: 2100,
                        maxLength: 4,
                        placeholderChar: "Y"
                    }
                }}
                autofix={false}
                lazy={false}
                overwrite={true}
                eager="append"
                unmask="typed"
                placeholder={"JJ / MM / YYYY"}
                onComplete={(value) => props.onChange(output(value))}
                value={input(props.value)}
                className={cn(
                    "rounded-[inherit] w-full text-sm placeholder:text-neutral/25 p-2",
                    "overflow-hidden whitespace-nowrap text-ellipsis",
                )}
                inputMode="decimal"
            />
        </div>
    )
}
