import { FormatNull } from "#/components/formats/formatNull.js"
import { cn } from "#/utilities/cn.js"
import { ComponentProps } from "react"


export function formatPrice(parameters: {
    price?: number | null | string
}) {
    if (parameters.price === undefined || parameters.price === null) return "/"
    return (
        new Intl.NumberFormat("fr", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            //@ts-ignore
            roundingMode: "halfExpand"
        }).format(Number(parameters.price)).replace(/,/g, '.')
    )
}


export function FormatPrice(props: {
    price?: number | null | string
    className?: ComponentProps<'div'>['className']
}) {
    if (props.price === undefined || props.price === null) {
        return (
            <FormatNull />
        )
    }
    return (
        <span className={cn(
            "w-fit max-w-full text-sm",
            formatPrice({
                price: props.price
            }) === "0.00" ? "text-neutral/25" : "",
            props.className
        )}>
            {Number(props.price) < 0
                ? `(${formatPrice({
                    price: Math.abs(Number(props.price))
                })})`
                : formatPrice({
                    price: props.price
                })}
        </span>
    )
}
