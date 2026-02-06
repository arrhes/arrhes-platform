
import { css, cx } from "../../utilities/cn.js"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { ComponentProps } from "react"


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
            className={cx(
                css({
                    display: "inline-flex",
                    h: "6",
                    w: "10",
                    flexShrink: "0",
                    cursor: "pointer",
                    alignItems: "center",
                    rounded: "full",
                    border: "1px solid",
                    borderColor: "neutral/25",
                    _disabled: { cursor: "not-allowed", opacity: "0.5" },
                    bg: "white",
                    _checked: { bg: "success/5", borderColor: "neutral" },
                    _focus: { shadow: "inset" }
                }),
                props.className
            )}
            checked={input(props.value)}
            onCheckedChange={(checked) => props.onChange(output(checked))}
            autoFocus={props.autoFocus}
        >
            <SwitchPrimitives.Thumb
                className={css({
                    pointerEvents: "none",
                    display: "block",
                    h: "4",
                    w: "4",
                    rounded: "full",
                    _checked: { bg: "neutral", transform: "translateX(18px)" },
                    bg: "neutral/10",
                    transform: "translateX(4px)",
                    shadow: "lg",
                    transition: "transform"
                })}
            />
        </SwitchPrimitives.Root>
    )
}
