import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { type InputHTMLAttributes, useRef } from "react"
import type { FieldError } from "react-hook-form"

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
                    padding: "1rem",
                    border: "1px solid",
                    borderRadius: "md",
                    backgroundColor: "neutral",
                    fontSize: "sm",
                }),
                css(props.error ? { borderColor: "error" } : { borderColor: "neutral/25" }),
            )}
            disabled
        />
    )
}
