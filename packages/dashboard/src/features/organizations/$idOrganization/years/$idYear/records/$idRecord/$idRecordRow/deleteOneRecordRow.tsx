import { ButtonGhost } from "#/components/buttons/buttonGhost.js"
import { ButtonPlain } from "#/components/buttons/buttonPlain.js"
import { Dialog } from "#/components/overlays/dialog/dialog.js"
import { toast } from "#/contexts/toasts/useToast.js"
import { platformRouter } from "#/routes/platformRouter.js"
import { invalidateData } from "#/utilities/invalidateData.js"
import { postAPI } from "#/utilities/postAPI.js"
import { deleteOneRecordRowRouteDefinition, readAllRecordRowsRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { IconTrash } from "@tabler/icons-react"
import { ComponentPropsWithRef, ReactElement, useState } from "react"
import * as v from "valibot"


export function DeleteOneRecordRow(props: {
    recordRow: v.InferOutput<typeof returnedSchemas.recordRow>
    children: ReactElement<ComponentPropsWithRef<'div'>>
}) {
    const [open, setOpen] = useState(false)

    async function onSubmit() {
        const deleteResponse = await postAPI({
            routeDefinition: deleteOneRecordRowRouteDefinition,
            body: {
                idRecordRow: props.recordRow.id,
                idOrganization: props.recordRow.idOrganization,
                idYear: props.recordRow.idYear,
            }
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression du mouvement", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllRecordRowsRouteDefinition,
            body: {
                idOrganization: props.recordRow.idOrganization,
                idYear: props.recordRow.idYear,
                idRecord: props.recordRow.idRecord,
            },
        })

        toast({ title: "Écriture supprimée", variant: "success" })

        platformRouter.navigate({
            to: "/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord",
            params: {
                idOrganization: props.recordRow.idOrganization,
                idYear: props.recordRow.idYear,
                idRecord: props.recordRow.idRecord,
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
                                Voulez-vous supprimer ce mouvement ?
                            </Dialog.Title>
                            <Dialog.Description>
                                Cette action supprimera le mouvement et toutes les données associées.
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
                                text="Supprimer le mouvement"
                                hasLoader
                            />
                        </Dialog.Footer>
                    </Dialog.Content>
                )
            }
        </Dialog.Root>
    )
}
