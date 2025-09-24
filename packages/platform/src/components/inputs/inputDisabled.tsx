import { InputHTMLAttributes, useRef } from 'react'
import { FieldError } from 'react-hook-form'
import { cn } from 'utilities/cn'


type InputDisabled = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
    error?: FieldError
    value?: string | null
    onChange?: (value?: string | null | undefined) => void
}

export function InputDisabled(props: InputDisabled) {
    const ref = useRef(null)
    return (
        <input
            ref={ref}
            className={cn(
                "relative w-full flex flex-row justify-between items-center gap-2 p-2 border border-solid rounded-md bg-neutral text-sm",
                (!props.error) ? "border-neutral/25" : "border-error"
            )}
            disabled
        />
    )
}
