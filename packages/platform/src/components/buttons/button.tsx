import { ButtonGhostContent } from "components/buttons/buttonGhostContent"
import { ButtonOutlineContent } from "components/buttons/buttonOutlineContent"
import { ButtonPlainContent } from "components/buttons/buttonPlainContent"
import { cloneElement, ComponentProps, ComponentPropsWithRef, MouseEvent, ReactElement, useState } from "react"
import { cn } from "utilities/cn"
import { sleep } from "utilities/sleep"


export type Button = Omit<ComponentPropsWithRef<"button">, "children"> & {
    hasLoader?: boolean
    children?: ReactElement<ComponentProps<(typeof ButtonOutlineContent | typeof ButtonGhostContent | typeof ButtonPlainContent)>>
}

export function Button(props: Button) {
    const [isLoading, setIsLoading] = useState(false)

    async function handleClick(e: MouseEvent<HTMLButtonElement>) {

        if (props.onClick === undefined) return
        if (props.hasLoader === false) return props.onClick(e)

        setIsLoading(true)
        await Promise.all([sleep(100), props.onClick(e)])
        setIsLoading(false)

        e.preventDefault()
    }


    return (
        <button
            {...{
                ...props,
                hasLoader: undefined,
            }}
            className={cn(
                "flex justify-start items-center cursor-pointer disabled:cursor-not-allowed w-fit max-w-full h-fit max-h-fit",
                // "select-text",
                props.className
            )}
            onClick={handleClick}
            type={props.type ?? "button"}
            disabled={props.disabled || isLoading}
            title={props.title}
        >
            {
                !props.children ? null :
                    cloneElement(props.children, {
                        ...(!props.hasLoader ? undefined : { isLoading: isLoading }),
                        disabled: props.disabled
                    })
            }
        </button>
    )
}