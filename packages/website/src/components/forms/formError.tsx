import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { forwardRef } from "react"
import { useFormField } from "./useFormField.js"

export const FormError = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>((props, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : props.children

    if (!body) return null
    return (
        <p
            ref={ref}
            id={formMessageId}
            className={cx(
                css({
                    width: "100%",
                    fontSize: "xs",
                    color: "error",
                }),
                props.className,
            )}
            {...props}
        >
            {body}
        </p>
    )
})
