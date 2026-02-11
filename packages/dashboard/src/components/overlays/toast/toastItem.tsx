import { Button, ButtonContent } from "@arrhes/ui"
import { IconAlertTriangle, IconCircleCheck, IconInfoSquare, IconX } from "@tabler/icons-react"
import { css } from "../../../utilities/cn.js"
import { ToasterToast, ToastVariant } from "../../../contexts/toasts/useToast.js"


const toastIcons: Record<ToastVariant, React.ReactNode> = {
    error: (
        <IconAlertTriangle size={20} className={css({ color: "error" })} />
    ),
    success: (
        <IconCircleCheck size={20} className={css({ color: "success" })} />
    ),
    warning: (
        <IconAlertTriangle size={20} className={css({ color: "warning" })} />
    ),
    information: (
        <IconInfoSquare size={20} className={css({ color: "information" })} />
    )
}

type ToastItemProps = {
    toast: ToasterToast
    onDismiss: (id: string) => void
}

export function ToastItem(props: ToastItemProps) {
    const variant = props.toast.variant ?? "information"

    return (
        <div
            className={css({
                pointerEvents: "auto",
                position: "relative",
                width: "100%",
                display: props.toast.open ? "flex" : "none",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "4",
                padding: "4",
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "neutral/10",
                backgroundColor: "white",
                boxShadow: "sm",
            })}
        >
            {toastIcons[variant]}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flex: "1",
                    minWidth: "0",
                })}
            >
                {
                    (props.toast.title === undefined)
                        ? null
                        : (
                            <span
                                className={css({
                                    fontSize: "md",
                                    color: "neutral",
                                })}
                            >
                                {props.toast.title}
                            </span>
                        )
                }
                {
                    (props.toast.description === undefined)
                        ? null
                        : (
                            <span
                                className={css({
                                    fontSize: "sm",
                                    color: "neutral/50",
                                })}
                            >
                                {props.toast.description}
                            </span>
                        )
                }
            </div>
            <Button
                title="Fermer"
                onClick={() => props.onDismiss(props.toast.id)}
            >
                <ButtonContent
                    variant="invisible"
                    leftIcon={<IconX />}
                />
            </Button>
        </div>
    )
}
