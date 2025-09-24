
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { ComponentProps } from "react"
import { cn } from "utilities/cn.js"


type InputSwitch = Omit<ComponentProps<typeof SwitchPrimitives.Root>, "value" | "onChange"> & {
    value: boolean
    onChange: (value: boolean) => void
}

export function InputSwitch(props: InputSwitch) {
    function input(value: boolean | undefined | null) {
        if (!value) return false
        return value
    }

    function output(value: boolean) {
        return value
    }

    return (
        <SwitchPrimitives.Root
            // {...props}
            ref={props.ref}
            className={cn(
                "inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-neutral/25 disabled:cursor-not-allowed disabled:opacity-50 bg-white data-[state=checked]:bg-success/5 data-[state=checked]:border-neutral",
                "focus:shadow-inner ",
                props.className
            )}
            checked={input(props.value)}
            onCheckedChange={(checked) => props.onChange(output(checked))}
            autoFocus={props.autoFocus}
        >
            <SwitchPrimitives.Thumb
                className={cn(
                    "pointer-events-none block h-4 w-4 rounded-full data-[state=checked]:bg-neutral data-[state=unchecked]:bg-neutral/10 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-1"
                )}
            />
        </SwitchPrimitives.Root>
    )
}
