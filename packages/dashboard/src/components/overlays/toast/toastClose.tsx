import { ButtonContent } from "@arrhes/ui"
import { css, cx } from "../../../utilities/cn.js"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { IconX } from "@tabler/icons-react"
import { ComponentProps } from "react"


type ToastClose = ComponentProps<typeof ToastPrimitives.Close>

export function ToastClose(props: ToastClose) {
    return (
        <ToastPrimitives.Close
            {...props}
            className={cx(
                css({
                    ml: "auto",
                    opacity: "0",
                    transition: "opacity",
                    _focus: { opacity: "1" },
                    _groupHover: { opacity: "1" }
                }),
                props.className
            )}
            toast-close=""
            asChild
        >
            <button
                type="button"
                aria-label="Fermer"
                className={css({ display: "flex", alignItems: "center" })}
            >
                <ButtonContent
                    variant="invisible"
                    leftIcon={<IconX />}
                />
            </button>
        </ToastPrimitives.Close>
    )
}
