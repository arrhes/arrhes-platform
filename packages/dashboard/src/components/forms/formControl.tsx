import { CircularLoader } from "#/components/layouts/circularLoader.js"
import { Slot } from "@radix-ui/react-slot"
import { ComponentProps, Suspense } from "react"
import { useFormField } from "./useFormField.js"


type FormControl = ComponentProps<typeof Slot>

export function FormControl(props: FormControl) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
        <Suspense
            fallback={<CircularLoader />}
        >
            <Slot
                {...props}
                id={formItemId}
                aria-describedby={
                    !error
                        ? `${formDescriptionId}`
                        : `${formDescriptionId} ${formMessageId}`
                }
                aria-invalid={!!error}
            />
        </Suspense>
    )
}