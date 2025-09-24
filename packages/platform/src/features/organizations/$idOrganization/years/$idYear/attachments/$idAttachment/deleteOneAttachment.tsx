import { deleteOneAttachmentRouteDefinition, readAllAttachmentsRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { IconTrash } from "@tabler/icons-react"
import { ButtonGhost } from "components/buttons/buttonGhost"
import { ButtonPlain } from "components/buttons/buttonPlain"
import { Dialog } from "components/overlays/dialog/dialog"
import { toast } from "contexts/toasts/useToast"
import { ComponentPropsWithRef, ReactElement, useState } from "react"
import { platformRouter } from "routes/platformRouter"
import { invalidateData } from "utilities/invalidateData"
import { postAPI } from "utilities/postAPI"
import * as v from "valibot"


export function DeleteOneAttachment(props: {
    attachment: v.InferOutput<typeof returnedSchemas.attachment>
    children: ReactElement<ComponentPropsWithRef<'div'>>
}) {
    const [open, setOpen] = useState(false)

    async function onSubmit() {
        const deleteResponse = await postAPI({
            routeDefinition: deleteOneAttachmentRouteDefinition,
            body: {
                idAttachment: props.attachment.id,
                idOrganization: props.attachment.idOrganization,
                idYear: props.attachment.idYear,
            }
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression du fichier", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllAttachmentsRouteDefinition,
            body: {
                idOrganization: props.attachment.idOrganization,
                idYear: props.attachment.idYear,
            },
        })

        toast({ title: "Fichier supprimé", variant: "success" })

        platformRouter.navigate({
            to: "/organisations/$idOrganization/exercices/$idYear/fichiers",
            params: {
                idOrganization: props.attachment.idOrganization,
                idYear: props.attachment.idYear
            },
        })

        setOpen(false)
    }

    async function onCancel() {
        setOpen(false)
    }

    return (
        <Dialog.Root
            open={open}
            onOpenChange={(value) => setOpen(value)}
        >
            <Dialog.Trigger
                onClick={(event) => {
                    setOpen(true)
                    event.preventDefault()
                }}
            >
                {props.children}
            </Dialog.Trigger>
            {(open === false)
                ? (null)
                : (
                    <Dialog.Content>
                        <Dialog.Header />
                        <div className="p-4 pt-0 flex flex-col justify-start items-start gap-1">
                            <Dialog.Title>
                                Voulez-vous supprimer ce fichier ?
                            </Dialog.Title>
                            <Dialog.Description>
                                Cette action supprimera le fichier et toutes les données associées.
                                <br />
                                Cette action est irréversible.
                            </Dialog.Description>
                        </div>
                        <Dialog.Footer>
                            <ButtonGhost
                                text="Annuler"
                                onClick={() => onCancel()}
                            />
                            <ButtonPlain
                                icon={<IconTrash />}
                                color="error"
                                onClick={() => onSubmit()}
                                text="Supprimer le fichier"
                                hasLoader
                            />
                        </Dialog.Footer>
                    </Dialog.Content>
                )
            }
        </Dialog.Root>
    )
}
