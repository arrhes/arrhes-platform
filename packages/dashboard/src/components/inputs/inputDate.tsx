import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { InputHTMLAttributes } from "react"
import { FieldError } from "react-hook-form"
import { IMask, IMaskInput } from "react-imask"


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
            className={cx(
                css({
                    height: "32px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    gap: "2",
                    border: "1px solid",
                    borderColor: "neutral/20",
                    borderRadius: "sm",
                    _focusWithin: { borderColor: "neutral/50", boxShadow: "inset" }
                }),
                css(props.error ? { borderColor: "error" } : {}),
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
                onAccept={(value: unknown) => props.onChange(output(String(value)))}
                value={input(props.value)}
                className={css({
                    borderRadius: "inherit",
                    width: "100%",
                    fontSize: "sm",
                    _placeholder: { color: "neutral/25" },
                    padding: "1rem",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                })}
                inputMode="decimal"
            />
        </div>
    )
}
