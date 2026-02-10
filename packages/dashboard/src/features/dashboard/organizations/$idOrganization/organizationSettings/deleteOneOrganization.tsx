import { deleteOneOrganizationRouteDefinition, getAllMyOrganizationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconTrash } from "@tabler/icons-react"
import { ComponentPropsWithRef, ReactElement, useState } from "react"
import * as v from "valibot"
import { Dialog } from "../../../../../components/overlays/dialog/dialog.tsx"
import { toast } from "../../../../../contexts/toasts/useToast.ts"
import { platformRouter } from "../../../../../routes/platformRouter.tsx"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"
import { postAPI } from "../../../../../utilities/postAPI.ts"


export function DeleteOneOrganization(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    children: ReactElement<ComponentPropsWithRef<'div'>>
}) {
    const [open, setOpen] = useState(false)

    async function onSubmit() {
        const deleteResponse = await postAPI({
            routeDefinition: deleteOneOrganizationRouteDefinition,
            body: {
                idOrganization: props.idOrganization
            }
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression de l'organisation", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: getAllMyOrganizationsRouteDefinition,
            body: {
                idOrganization: props.idOrganization
            },
        })

        toast({ title: "Organisation supprimée", variant: "success" })

        platformRouter.navigate({ to: "/dashboard/organisations" })
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
                                Voulez-vous supprimer cette organisation ?
                            </Dialog.Title>
                            <Dialog.Description>
                                Cette action supprimera l'organisation et toutes les données associées.
                                <br />
                                Cette action est irréversible.
                            </Dialog.Description>
                        </div>
                        <Dialog.Footer>
                            <Button onClick={() => onCancel()}>
                                <ButtonContent variant="invisible" text="Annuler" />
                            </Button>
                            <Button onClick={() => onSubmit()} hasLoader>
                                <ButtonContent variant="primary" leftIcon={<IconTrash />} color="error" text="Supprimer l'organisation" />
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                )
            }
        </Dialog.Root>
    )
}
