import { deleteOneComputationRouteDefinition, readAllComputationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconTrash } from "@tabler/icons-react"
import { ComponentPropsWithRef, ReactElement, useState } from "react"
import * as v from "valibot"
import { Dialog } from "../../../../../../../../../../components/overlays/dialog/dialog.tsx"
import { toast } from "../../../../../../../../../../contexts/toasts/useToast.ts"
import { platformRouter } from "../../../../../../../../../../routes/platformRouter.tsx"
import { invalidateData } from "../../../../../../../../../../utilities/invalidateData.ts"
import { postAPI } from "../../../../../../../../../../utilities/postAPI.ts"


export function DeleteOneComputation(props: {
    computation: v.InferOutput<typeof returnedSchemas.computation>
    children: ReactElement<ComponentPropsWithRef<'div'>>
}) {
    const [open, setOpen] = useState(false)

    async function onSubmit() {
        const deleteResponse = await postAPI({
            routeDefinition: deleteOneComputationRouteDefinition,
            body: {
                idComputation: props.computation.id,
                idOrganization: props.computation.idOrganization,
                idYear: props.computation.idYear,
            }
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression de la ligne de calcul", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllComputationsRouteDefinition,
            body: {
                idOrganization: props.computation.idOrganization,
                idYear: props.computation.idYear,
            },
        })

        toast({ title: "Ligne de calcul supprimée", variant: "success" })

        platformRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat",
            params: {
                idOrganization: props.computation.idOrganization,
                idYear: props.computation.idYear
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
                        <div className={css({ padding: "4", pt: "0", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "1" })}>
                            <Dialog.Title>
                                Voulez-vous supprimer cette ligne de calcul ?
                            </Dialog.Title>
                            <Dialog.Description>
                                Cette action supprimera la ligne de calcul et toutes les données associées.
                                <br />
                                Cette action est irréversible.
                            </Dialog.Description>
                        </div>
                        <Dialog.Footer>
                            <Button onClick={() => onCancel()}>
                                <ButtonContent variant="invisible" text="Annuler" />
                            </Button>
                            <Button onClick={() => onSubmit()} hasLoader>
                                <ButtonContent variant="primary" leftIcon={<IconTrash />} color="error" text="Supprimer la ligne de calcul" />
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                )
            }
        </Dialog.Root>
    )
}
