import { ButtonGhost } from "#/components/buttons/buttonGhost.js"
import { ButtonPlain } from "#/components/buttons/buttonPlain.js"
import { Dialog } from "#/components/overlays/dialog/dialog.js"
import { toast } from "#/contexts/toasts/useToast.js"
import { platformRouter } from "#/routes/platformRouter.js"
import { invalidateData } from "#/utilities/invalidateData.js"
import { postAPI } from "#/utilities/postAPI.js"
import { duplicateOneRecordRouteDefinition, readAllRecordsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconCopyCheck } from "@tabler/icons-react"
import { ComponentPropsWithRef, ReactElement, useState } from "react"
import * as v from "valibot"


export function DuplicateOneRecord(props: {
    record: v.InferOutput<typeof returnedSchemas.record>
    children: ReactElement<ComponentPropsWithRef<'div'>>
}) {
    const [open, setOpen] = useState(false)

    async function onSubmit() {
        const duplicateResponse = await postAPI({
            routeDefinition: duplicateOneRecordRouteDefinition,
            body: {
                idRecord: props.record.id,
                idOrganization: props.record.idOrganization,
                idYear: props.record.idYear,
            }
        })

        if (duplicateResponse.ok === false) {
            toast({ title: "Erreur lors de la duplication de l'écriture", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllRecordsRouteDefinition,
            body: {
                idOrganization: props.record.idOrganization,
                idYear: props.record.idYear,
            },
        })

        toast({ title: "Écriture dupliquée", variant: "success" })

        platformRouter.navigate({
            to: "/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord",
            params: {
                idOrganization: props.record.idOrganization,
                idYear: props.record.idYear,
                idRecord: duplicateResponse.data.id,
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
                                Voulez-vous dupliquer cette écriture ?
                            </Dialog.Title>
                            <Dialog.Description>
                                Cette action dupliquera l'écriture et toutes les données associées.
                            </Dialog.Description>
                        </div>
                        <Dialog.Footer>
                            <ButtonGhost
                                text="Annuler"
                                onClick={() => onCancel()}
                            />
                            <ButtonPlain
                                icon={<IconCopyCheck />}
                                onClick={() => onSubmit()}
                                text="Dupliquer l'écriture"
                                hasLoader
                            />
                        </Dialog.Footer>
                    </Dialog.Content>
                )
            }
        </Dialog.Root>
    )
}
