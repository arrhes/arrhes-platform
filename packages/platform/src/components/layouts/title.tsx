import { ComponentProps } from "react"


export function TitleComponent(props: {
    children: string
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <span className="uppercase text-neutral/25 text-base">
            {props.children}
        </span>
    )
}
