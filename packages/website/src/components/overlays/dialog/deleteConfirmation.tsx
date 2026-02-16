import { Button, ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconAlertTriangle, IconTrash } from "@tabler/icons-react"
import { type ComponentPropsWithRef, type JSX, type ReactElement, useState } from "react"
import { Dialog } from "./dialog.js"

export function DeleteConfirmation(props: {
    title: string
    description: string | JSX.Element
    submitText: string
    onSubmit: () => Promise<void>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    const [open, setOpen] = useState(false)

    async function handleSubmit() {
        await props.onSubmit()
        setOpen(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={(value) => setOpen(value)}>
            <Dialog.Trigger
                onClick={(event) => {
                    setOpen(true)
                    event.preventDefault()
                }}
            >
                {props.children}
            </Dialog.Trigger>
            {open === false ? null : (
                <Dialog.Content>
                    <Dialog.Header>
                        <div
                            className={css({
                                padding: "0.5rem",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "0.75rem",
                            })}
                        >
                            <IconAlertTriangle size={16} className={css({ color: "error" })} />
                        </div>
                        <Dialog.Title>{props.title}</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Dialog.Description>{props.description}</Dialog.Description>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button onClick={() => setOpen(false)}>
                            <ButtonContent variant="default" text="Annuler" />
                        </Button>
                        <Button onClick={handleSubmit} hasLoader>
                            <ButtonContent
                                variant="primary"
                                leftIcon={<IconTrash />}
                                color="error"
                                text={props.submitText}
                            />
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            )}
        </Dialog.Root>
    )
}
