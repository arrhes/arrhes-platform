import { colorVariant } from "@arrhes/schemas/components"
import { IconAlertHexagon, IconAlertTriangle, IconCircleCheck, IconInfoSquare } from "@tabler/icons-react"
import { ComponentProps, ReactElement } from "react"
import { cn } from "utilities/cn"




export function Banner(props: {
    text?: string | null
    variant?: (typeof colorVariant)[number]
    className?: ComponentProps<'div'>['className']
    children?: ReactElement | string | null | Array<ReactElement | string | null>
}) {

    const banners = {
        "neutral": {
            icon: null,
            bg: "bg-background",
            text: "text-neutral"
        },
        "information": {
            icon: <IconInfoSquare size={20} className="text-information" />,
            bg: "bg-information/5",
            text: "text-information"
        },
        "error": {
            icon: <IconAlertTriangle size={20} className="text-error" />,
            bg: "bg-error/5",
            text: "text-error"
        },
        "warning": {
            icon: <IconAlertHexagon size={20} className="text-warning" />,
            bg: "bg-warning/5",
            text: "text-warning"
        },
        "success": {
            icon: <IconCircleCheck size={20} className="text-success" />,
            bg: "bg-success/5",
            text: "text-success"
        }
    }

    return (
        <div
            className={cn(
                "w-full p-4 flex justify-start items-start gap-2 rounded-md",
                banners[props?.variant ?? "neutral"].bg,
                props.className
            )}
        >
            <p className={cn(
                "",
                banners[props?.variant ?? "neutral"].text,
                props.className
            )}
            >
                {props.children}
            </p>
        </div>
    )
}
