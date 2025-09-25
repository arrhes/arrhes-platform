import { cn } from "#/utilities/cn.js"
import { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'


type InputText = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
    error?: FieldError
    value?: string | null | undefined
    onChange?: (value?: string | null | undefined) => void
}

export function InputText(props: InputText) {
    function input(value: string | undefined | null) {
        if (!value) return ""
        return value
    }

    function output(value: string | undefined | null) {
        if (!value) return null
        return value
    }

    return (
        <div
            className={cn(
                "w-full h-[32px] flex justify-between items-center gap-2 border border-solid rounded-sm",
                "focus-within:border-neutral/50 focus-within:shadow-inner",
                (!props.error) ? "border-neutral/25" : "border-error",
                props.className
            )}
        >
            <input
                {...props}
                type="text"
                className={cn(
                    "w-full h-full text-sm leading-none placeholder:text-neutral/25 bg-transparent p-2 rounded-md",
                )}
                value={input(props.value)}
                onChange={(e) => {
                    if (!props.onChange) return
                    props?.onChange(output(e.currentTarget.value))
                }}
            />
        </div>
    )
}