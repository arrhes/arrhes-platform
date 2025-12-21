import { cn } from "#/utilities/cn.js"
import { forwardRef } from "react"
import { useFormField } from "./useFormField.js"


export const FormError = forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(function (props, ref) {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : props.children

    if (!body) return null
    return (
        <p
            ref={ref}
            id={formMessageId}
            className={cn("w-full text-xs text-error", props.className)}
            {...props}
        >
            {body}
        </p>
    )
})
