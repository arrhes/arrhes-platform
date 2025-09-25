
import { Button } from "#/components/buttons/button.js"
import { ButtonGhostContent } from "#/components/buttons/buttonGhostContent.js"
import { cn } from "#/utilities/cn.js"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { ComponentProps, JSX } from "react"


export function InputToggle<TValue extends (string | boolean)>(props:
    Omit<ComponentProps<typeof SwitchPrimitives.Root>, "value" | "onChange">
    & {
        value: TValue | null | undefined
        onChange: (value: TValue | null | undefined) => void
        options: Array<{
            icon?: JSX.Element
            label?: string
            value: TValue
        }>
    }
) {
    return (
        <div className={cn(
            "w-fit h-[32px] flex justify-start items-center border border-neutral/20 rounded-sm cursor-pointer",
            "focus:border-neutral/50 focus:shadow-inner outline-none",
        )}
        >
            {
                props.options.map((option, index) => {
                    const isSelected = (props.value === option.value)
                    return (
                        <Button
                            key={`option_${index}`}
                            onClick={() => {
                                if (isSelected === true) {
                                    props.onChange(null)
                                    return
                                }
                                props.onChange(option.value)
                            }}
                            className={cn(
                                "border-r border-neutral/5 last:border-none"
                            )}
                        >
                            <ButtonGhostContent
                                className={cn(
                                    "duration-200 ease-in-out rounded-none border-none",
                                    (isSelected === true) ? "bg-neutral/10 outline outline-solid outline-neutral rounded-sm" : ""
                                )}
                                text={option.label}
                                icon={option.icon}
                            />
                        </Button>
                    )
                })
            }
        </div>
    )
}
