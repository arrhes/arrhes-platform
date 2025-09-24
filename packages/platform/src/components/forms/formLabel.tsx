
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { IconInfoSquare } from "@tabler/icons-react"
import { HTMLAttributes } from "react"
import { useFormField } from "./useFormField"


type FormLabel = {
    label: string | undefined
    isRequired?: boolean
    description?: string | undefined
    tooltip?: string | undefined
    labelProps?: HTMLAttributes<HTMLLabelElement>
}

export function FormLabel(props: FormLabel) {
    const { formItemId } = useFormField()

    return (
        <label
            {...props.labelProps}
            htmlFor={formItemId}
            aria-required={props.isRequired}
            className="flex justify-start items-center gap-2"
        >
            <div className="flex flex-col justify-start items-start gap-1">
                <div className="inline-flex justify-start items-center gap-2">
                    {(!props.label) ? null : (
                        <span className="text-xs text-neutral/50 before:content-['\200b']">
                            {props.label}
                        </span>
                    )}
                    {
                        (props.isRequired !== true)
                            ? null
                            : (
                                <span className="text-error text-sm">
                                    *
                                </span>
                            )
                    }
                </div>
                {(!props.description) ? null : (
                    <span className="text-neutral/50 text-sm">
                        {props.description}
                    </span>
                )}
            </div>
            {(!props.tooltip) ? null : (
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger className="cursor-help" onClick={(e) => e.preventDefault()} tabIndex={-1}>
                            <IconInfoSquare size={20} className="text-neutral/50 hover:text-neutral hover:fill-neutral/5" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-neutral p-2">
                            <p className="break-words hyphens-auto text-white text-sm">{props.tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </label>
    )
}