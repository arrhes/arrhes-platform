import { Button } from "@arrhes/ui"
import { css, cx } from "../../utilities/cn.js"
import { IconEye, IconEyeClosed } from '@tabler/icons-react'
import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { FieldError } from 'react-hook-form'


type InputPassword = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
    error?: FieldError
    value?: string | null
    onChange: (value?: string | null | undefined) => void
    autoFocus?: boolean
}

export const InputPassword = forwardRef<HTMLInputElement, InputPassword>(
    function (props, ref) {
        const [showPassword, setShowPassword] = useState(false)
        const handleClickShowPassword = () => setShowPassword((show) => !show)

        function input(value: string | undefined | null) {
            if (!value) return ""
            return value
        }

        function output(value: string) {
            if (!value) return null
            return value
        }

        return (
            <div
                className={cx(
                    css({
                        w: "full",
                        h: "32px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "1px solid",
                        rounded: "sm",
                        _focusWithin: { borderColor: "neutral/50", shadow: "inset" }
                    }),
                    css((!props.error) ? { borderColor: "neutral/25" } : { borderColor: "error" }),
                    props.className
                )}
            >
                <input
                    {...props}
                    type={showPassword ? "text" : "password"}
                    className={css({
                        w: "full",
                        h: "32px",
                        fontSize: "sm",
                        lineHeight: "none",
                        _placeholder: { color: "neutral/50" },
                        bg: "transparent",
                        p: "2",
                        rounded: "md"
                    })}
                    ref={ref}
                    value={input(props.value)}
                    onChange={(e) => props.onChange(output(e.currentTarget.value))}
                    autoFocus={props.autoFocus}
                />
                <Button
                    onClick={handleClickShowPassword}
                    className={css({
                        _hover: { bg: "neutral/5" },
                        rounded: "md",
                        p: "2"
                    })}
                    tabIndex={-1}
                >
                    {showPassword ? <IconEye size={16} /> : <IconEyeClosed size={16} />}
                </Button>
            </div>
        )
    }
)
