import { deleteOneOrganizationUserRouteDefinition, readOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconTrash } from "@tabler/icons-react"
import { ComponentPropsWithRef, ReactElement, useState } from "react"
import * as v from "valibot"
import { Dialog } from "../../../../../../../components/overlays/dialog/dialog.tsx"
import { toast } from "../../../../../../../contexts/toasts/useToast.ts"
import { invalidateData } from "../../../../../../../utilities/invalidateData.ts"
import { postAPI } from "../../../../../../../utilities/postAPI.ts"


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
                        <div className={css({ padding: "4", pt: "0", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "1" })}>
                            <Dialog.Title>
                                Voulez-vous supprimer l'utilisateur de cette organisation ?
                            </Dialog.Title>
                            <Dialog.Description>
                                Cette action est irréversible.
                            </Dialog.Description>
                        </div>
                        <Dialog.Footer>
                            <Button onClick={() => onCancel()}>
                                <ButtonContent variant="invisible" text="Annuler" />
                            </Button>
                            <Button onClick={() => onSubmit()} hasLoader>
                                <ButtonContent variant="primary" leftIcon={<IconTrash />} color="error" text="Supprimer l'utilisateur" />
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                )
            }
        </Dialog.Root>
    )
}
