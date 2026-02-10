import { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import { css, cx } from "../../utilities/cn.js"


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
            className={cx(
                css({
                    width: "100%",
                    height: "32px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "2",
                    border: "1px solid",
                    borderRadius: "sm",
                    _focusWithin: { borderColor: "neutral/50", boxShadow: "inset" }
                }),
                css((!props.error) ? { borderColor: "neutral/25" } : { borderColor: "error" }),
                props.className
            )}
        >
            <input
                {...props}
                type="text"
                className={css({
                    width: "100%",
                    height: "100%",
                    fontSize: "sm",
                    lineHeight: "none",
                    _placeholder: { color: "neutral/25" },
                    backgroundColor: "transparent",
                    padding: "1rem",
                    borderRadius: "md"
                })}
                value={input(props.value)}
                onChange={(e) => {
                    if (!props.onChange) return
                    props?.onChange(output(e.currentTarget.value))
                }}
            />
        </div>
    )
}