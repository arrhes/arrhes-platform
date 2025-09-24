import { ComponentPropsWithRef, useRef } from 'react'
import { FieldError } from 'react-hook-form'
import { cn } from "utilities/cn"


export function InputTextArea(props:
    & Omit<ComponentPropsWithRef<"textarea">, "value" | "onChange">
    & {
        error?: FieldError
        value?: string | null
        onChange: (value?: string | null | undefined) => void
    }
) {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

    function input(value: string | undefined | null) {
        if (!value) return ""
        return value
    }

    function output(value: string) {
        if (!value) return null
        return value
    }

    return (
        <textarea
            {...props}
            ref={textAreaRef}
            className={cn(
                "w-full min-h-[128px] flex justify-center items-center gap-2 p-2 border rounded-sm text-sm placeholder:text-neutral/50",
                "focus:border-neutral/50 focus:shadow-inner outline-none",
                (!props.error) ? "border-neutral/25" : "border-error",
                "shrink-0 resize-none field-sizing-content h-fit overflow-auto",
                props.className
            )}
            value={input(props.value)}
            onChange={(e) => {
                if (!props.onChange) return
                props?.onChange(output(e.currentTarget.value))

                if (!textAreaRef.current) return
                textAreaRef.current.style.height = "auto" // will not work without this!
                textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
            }}
        />
    )
} 