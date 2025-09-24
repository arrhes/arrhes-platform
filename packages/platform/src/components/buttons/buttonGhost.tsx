import { cn } from "utilities/cn"
import { Button } from "./button"
import { ButtonGhostContent } from "./buttonGhostContent"


export function ButtonGhost(props:
    ButtonGhostContent & Button
) {
    return (
        <Button
            {...props}
            onClick={props.onClick}
            hasLoader={props.hasLoader}
            className={cn("group", props.className)}
            disabled={props.disabled}
            title={props.title ?? props.text}
        >
            <ButtonGhostContent
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