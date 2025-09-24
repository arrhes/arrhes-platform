import { cn } from "utilities/cn"
import { Button } from "./button"
import { ButtonOutlineContent } from "./buttonOutlineContent"


type ButtonOutline = ButtonOutlineContent & Button

export function ButtonOutline(props: ButtonOutline) {
    return (
        <Button
            {...props}
            onClick={props.onClick}
            hasLoader={props.hasLoader}
            className={cn("group", props.className)}
            disabled={props.disabled}
            title={props.title ?? props.text}
        >
            <ButtonOutlineContent
                disabled={props.disabled}
                text={props.text}
                icon={props.icon}
                color={props.color}
                className={props.className}
                title={props.title ?? props.text}
            />
        </Button>
    )
}
