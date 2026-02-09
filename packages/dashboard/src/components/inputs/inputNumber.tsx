import { InputHTMLAttributes } from "react"
import { FieldError } from "react-hook-form"
import { IMask, IMaskInput } from 'react-imask'
import { css, cx } from "../../utilities/cn.js"


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
        <div className={cx(
            css({
                height: "32px",
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "stretch",
                border: "1px solid",
                borderColor: "neutral/20",
                rounded: "sm"
            }),
            css(props.error ? { borderColor: "error" } : {}),
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
                onAccept={(value: unknown) => props.onChange(output(String(value)))}
                value={input(props.value)}
                className={css({
                    rounded: "inherit",
                    width: "100%",
                    fontSize: "base",
                    _placeholder: { color: "neutral/25" },
                    p: "2",
                    _focus: { shadowidth: "inset", backgroundColor: "neutral/5" },
                    overflowidth: "hidden",
                    whiteSpace: "nowrap",
                    textOverflowidth: "ellipsis"
                })}
                inputMode="decimal"
            />
        </div>

    )
}
