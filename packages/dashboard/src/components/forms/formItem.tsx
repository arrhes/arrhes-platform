import { css, cx } from "../../utilities/cn.js"
import { HTMLAttributes, useId } from "react"
import { FormItemContext } from "./formItemContext.js"


type FormItem = HTMLAttributes<HTMLDivElement>

export function FormItem(props: FormItem) {
    const id = useId()

    return (
        <FormItemContext.Provider value={{ id }}>
            <div
                {...props}
                className={cx(
                    css({
                        w: "full",
                        display: "flex",
                        flexDir: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "1"
                    }),
                    props.className
                )}
            />
        </FormItemContext.Provider>
    )
}