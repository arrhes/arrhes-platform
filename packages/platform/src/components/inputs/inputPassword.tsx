import { IconEye, IconEyeClosed } from '@tabler/icons-react'
import { Button } from 'components/buttons/button'
import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { FieldError } from 'react-hook-form'
import { cn } from 'utilities/cn'


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
                className={cn(
                    "w-full h-[32px] flex justify-between items-center border border-solid rounded-sm",
                    "focus-within:border-neutral/50 focus-within:shadow-inner",
                    (!props.error) ? "border-neutral/25" : "border-error",
                    props.className
                )}
            >
                <input
                    {...props}
                    type={showPassword ? "text" : "password"}
                    className={cn(
                        "w-full h-[32px] text-sm leading-none placeholder:text-neutral/50 bg-transparent p-2 rounded-md",
                    )}
                    ref={ref}
                    value={input(props.value)}
                    onChange={(e) => props.onChange(output(e.currentTarget.value))}
                    autoFocus={props.autoFocus}
                />
                <Button
                    onClick={handleClickShowPassword}
                    className="hover:bg-neutral/5 rounded-md p-2"
                    tabIndex={-1}
                >
                    {showPassword ? <IconEye size={16} /> : <IconEyeClosed size={16} />}
                </Button>
            </div>
        )
    }
)
