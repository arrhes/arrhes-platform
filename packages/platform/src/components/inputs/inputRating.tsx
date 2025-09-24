import { IconStarFilled } from '@tabler/icons-react'
import { InputHTMLAttributes, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import { cn } from 'utilities/cn'


type InputText = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
    error?: FieldError
    value?: number | null
    onChange?: (value?: number | null | undefined) => void
}

export const InputRating = forwardRef<HTMLInputElement, InputText>(
    function (props, ref) {

        function input(value: number | undefined | null) {
            if (!value) return 0
            return value
        }

        function output(value: number) {
            if (value === 0) return undefined
            return value
        }

        return (
            <div className="flex">
                <input className="hidden" ref={ref} />
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <div
                            key={i}
                            className="group"
                            onClick={() => {
                                if (!props.onChange) return
                                props?.onChange(output((i === +input(props.value) - 1) ? 0 : i + 1))
                            }
                            }
                        >
                            <IconStarFilled
                                size={16}
                                className={cn(
                                    "fill-none stroke-neutral/50 group-hover:fill-neutral/10",
                                    i < +input(props.value) ? "fill-neutral" : ""
                                )}
                            />
                        </div>
                    ))}
            </div>
        )
    }
)
