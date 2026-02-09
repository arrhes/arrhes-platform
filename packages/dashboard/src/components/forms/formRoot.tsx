import { Button } from "@arrhes/ui"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { ReactElement, useEffect, useRef } from "react"
import { DefaultValues, FormProvider, useForm, UseFormReturn } from "react-hook-form"
import * as v from "valibot"
import { css, cx } from "../../utilities/cn.js"


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
    submitButtonProps: Parameters<typeof Button>[0]
    children: (form: UseFormReturn<v.InferOutput<U>, any, v.InferOutput<U>>) => ReactElement
}) {
    const form = useForm<T>({
        mode: "onSubmit",
        criteriaMode: "all",
        shouldFocusError: true,
        defaultValues: props.defaultValues,
        resolver: valibotResolver<T, any, T>(props.schema),
    })
    const submitButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const listener = async (event: KeyboardEvent) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
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
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                })}
            //  onSubmit={}
            >
                <div className={css({
                    width: "100%",
                    maxWidth: "md",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    gap: "4"
                })}>
                    <div className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "stretch",
                        gap: "2"
                    })}>
                        {props.children(form)}
                    </div>
                    <Button
                        {...props.submitButtonProps}
                        variant="primary"
                        ref={submitButtonRef}
                        className={cx(
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
