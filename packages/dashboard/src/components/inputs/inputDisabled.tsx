import { InputHTMLAttributes, useRef } from 'react'
import { FieldError } from 'react-hook-form'
import { css, cx } from "../../utilities/cn.js"


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
            className={cx(
                css({
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "2",
                    p: "2",
                    border: "1px solid",
                    rounded: "md",
                    backgroundColor: "neutral",
                    fontSize: "sm"
                }),
                css(props.error ? { borderColor: "error" } : { borderColor: "neutral/25" })
            )}
            disabled
        />
    )
}
