import { Slot } from "@radix-ui/react-slot"
import { ComponentProps, Suspense } from "react"
import { CircularLoader } from "../layouts/circularLoader.js"
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