import { valibotResolver } from "@hookform/resolvers/valibot"
import { ButtonPlain } from "components/buttons/buttonPlain"
import { ReactElement, useEffect, useRef } from "react"
import { DefaultValues, FormProvider, useForm, UseFormReturn } from "react-hook-form"
import { cn } from "utilities/cn"
import * as v from "valibot"


export function FormRoot<
    T extends Record<string, unknown>,
    U extends v.GenericSchema<T>
>(props: {
    schema: U
    defaultValues: DefaultValues<v.InferOutput<U>>
    onSubmit: (data: v.InferOutput<U>) => Promise<boolean>
    onCancel: ((data: v.InferOutput<U>) => void) | (() => Promise<void>) | undefined
    onSuccess: ((data: v.InferOutput<U>) => void) | (() => Promise<void>) | undefined
    resetOnSubmit?: boolean
    submitOnPressEnterKey?: boolean
    submitButtonProps: Parameters<typeof ButtonPlain>[0]
    children: (form: UseFormReturn<v.InferOutput<U>, any, v.InferOutput<U>>) => ReactElement
}) {
    const form = useForm<T>({
        mode: "onSubmit",
        criteriaMode: "all",
        shouldFocusError: true,
        defaultValues: props.defaultValues,
        resolver: valibotResolver(props.schema),
    })
    const submitButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const listener = async (event: KeyboardEvent) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                console.log("Enter key was pressed. Run your function.")
                event.preventDefault()
                submitButtonRef.current?.click()
            }
        }
        document.addEventListener("keydown", listener)
        return () => {
            document.removeEventListener("keydown", listener)
        }
    }, [])

    return (
        <FormProvider {...form}>
            <form
                className="w-full flex flex-col justify-start items-start"
            //  onSubmit={}
            >
                <div className="w-full max-w-md flex flex-col justify-start items-stretch gap-4">
                    <div className="w-full flex flex-col justify-start items-stretch gap-2">
                        {props.children(form)}
                    </div>
                    <ButtonPlain
                        {...props.submitButtonProps}
                        ref={submitButtonRef}
                        className={cn(
                            "",
                            props.submitButtonProps.className
                        )}
                        type="button"
                        hasLoader={true}
                        onClick={async (event) => {
                            event.preventDefault()

                            const triggerResponse = await form.trigger()
                            if (!triggerResponse) return

                            const data = form.getValues()
                            const response = await props.onSubmit(data)
                            if (!response) return

                            if (props.resetOnSubmit === true) {
                                form.reset()
                            }

                            if (props.onSuccess !== undefined) {
                                await props.onSuccess(data)
                            }
                        }}
                    />
                </div>
            </form>
        </FormProvider>
    )
}
