import { cn } from "#/utilities/cn.js"
import { HTMLAttributes, useId } from "react"
import { FormItemContext } from "./formItemContext.js"


type FormItem = HTMLAttributes<HTMLDivElement>

export function FormItem(props: FormItem) {
    const id = useId()

    return (
        <FormItemContext.Provider value={{ id }}>
            <div
                {...props}
                className={cn("w-full flex flex-col justify-start items-start gap-1", props.className)}
            />
        </FormItemContext.Provider>
    )
}