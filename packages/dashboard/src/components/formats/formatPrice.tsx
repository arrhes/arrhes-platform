import { FormatNull } from "../../components/formats/formatNull.js"
import { css, cx } from "../../utilities/cn.js"
import { ComponentProps } from "react"


export function formatPrice(parameters: {
    price?: number | null | string
}) {
    if (parameters.price === undefined || parameters.price === null) return "/"
    const price = Number(parameters.price)
    const processedPrice = Math.abs(price) < 0.0090
        ? 0
        : price
    return (
        new Intl.NumberFormat("fr", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            //@ts-ignore
            roundingMode: "halfExpand"
        }).format(processedPrice).replace(/,/g, '.')
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
    const price = Number(props.price)
    const processedPrice = Math.abs(price) < 0.0090
        ? 0
        : price
    return (
        <span className={cx(
            css({
                w: "fit",
                maxW: "full",
                fontSize: "sm"
            }),
            processedPrice === 0 ? css({ color: "neutral/25" }) : undefined,
            props.className
        )}>
            {processedPrice < 0
                ? `(${formatPrice({
                    price: Math.abs(processedPrice)
                })})`
                : formatPrice({
                    price: Math.abs(processedPrice)
                })}
        </span>
    )
}
