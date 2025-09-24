import { deleteOneOrganizationUserRouteDefinition, readOneOrganizationRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { IconTrash } from "@tabler/icons-react"
import { ButtonGhost } from "components/buttons/buttonGhost"
import { ButtonPlain } from "components/buttons/buttonPlain"
import { Dialog } from "components/overlays/dialog/dialog"
import { toast } from "contexts/toasts/useToast"
import { ComponentPropsWithRef, ReactElement, useState } from "react"
import { invalidateData } from "utilities/invalidateData"
import { postAPI } from "utilities/postAPI"
import * as v from "valibot"


export function DeleteOneOrganizationUser(props: {
    organizationUser: v.InferOutput<typeof returnedSchemas.organizationUser>
    children: ReactElement<ComponentPropsWithRef<'div'>>
}) {
    const [open, setOpen] = useState(false)

    async function onSubmit() {
        const deleteResponse = await postAPI({
            routeDefinition: deleteOneOrganizationUserRouteDefinition,
            body: {
                idOrganizationUser: props.organizationUser.id,
                idOrganization: props.organizationUser.idOrganization,
            }
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression de l'utilisateur", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readOneOrganizationRouteDefinition,
            body: {
                idOrganization: props.organizationUser.idOrganization
            },
        })
        toast({ title: "Utilisateur supprimé de l'organisation", variant: "success" })
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
                                Voulez-vous supprimer l'utilisateur de cette organisation ?
                            </Dialog.Title>
                            <Dialog.Description>
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
                                text="Supprimer l'utilisateur"
                                hasLoader
                            />
                        </Dialog.Footer>
                    </Dialog.Content>
                )
            }
        </Dialog.Root>
    )
}
