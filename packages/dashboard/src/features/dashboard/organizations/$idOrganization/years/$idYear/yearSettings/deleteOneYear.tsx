import { deleteOneYearRouteDefinition, readAllYearsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconTrash } from "@tabler/icons-react"
import { ComponentPropsWithRef, ReactElement, useState } from "react"
import * as v from "valibot"
import { Dialog } from "../../../../../../../components/overlays/dialog/dialog.js"
import { toast } from "../../../../../../../contexts/toasts/useToast.js"
import { platformRouter } from "../../../../../../../routes/platformRouter.js"
import { invalidateData } from "../../../../../../../utilities/invalidateData.js"
import { postAPI } from "../../../../../../../utilities/postAPI.js"


export function DeleteOneYear(props: {
    year: v.InferOutput<typeof returnedSchemas.year>
    children: ReactElement<ComponentPropsWithRef<'div'>>
}) {
    const [open, setOpen] = useState(false)

    async function onSubmit() {
        const deleteResponse = await postAPI({
            routeDefinition: deleteOneYearRouteDefinition,
            body: {
                idOrganization: props.year.idOrganization,
                idYear: props.year.id
            }
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression de l'exercice", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllYearsRouteDefinition,
            body: {
                idOrganization: props.year.idOrganization
            },
        })

        toast({ title: "Exercice supprimé", variant: "success" })

        platformRouter.navigate({
            to: "/organisations/$idOrganization/exercices",
            params: {
                idOrganization: props.year.idOrganization
            }
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
                        <div className={css({ p: "4", pt: "0", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "1" })}>
                            <Dialog.Title>
                                Voulez-vous supprimer cet exercice ?
                            </Dialog.Title>
                            <Dialog.Description>
                                Cette action supprimera l'exercice et toutes les données associées.
                                <br />
                                Cette action est irréversible.
                            </Dialog.Description>
                        </div>
                        <Dialog.Footer>
                            <Button
                                variant="invisible"
                                text="Annuler"
                                onClick={() => onCancel()}
                            />
                            <Button
                                variant="primary"
                                icon={<IconTrash />}
                                color="error"
                                onClick={() => onSubmit()}
                                text="Supprimer l'exercice"
                                hasLoader
                            />
                        </Dialog.Footer>
                    </Dialog.Content>
                )
            }
        </Dialog.Root>
    )
}
