import { duplicateOneRecordRouteDefinition, readAllRecordsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconCopyCheck } from "@tabler/icons-react"
import { ComponentPropsWithRef, ReactElement, useState } from "react"
import * as v from "valibot"
import { Dialog } from "../../../../../../../../components/overlays/dialog/dialog.tsx"
import { Button } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { toast } from "../../../../../../../../contexts/toasts/useToast.ts"
import { platformRouter } from "../../../../../../../../routes/platformRouter.tsx"
import { invalidateData } from "../../../../../../../../utilities/invalidateData.ts"
import { postAPI } from "../../../../../../../../utilities/postAPI.ts"


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
                        <div className={css({ padding: "4", paddingTop: "0", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "1" })}>
                            <Dialog.Title>
                                Voulez-vous dupliquer cette écriture ?
                            </Dialog.Title>
                            <Dialog.Description>
                                Cette action dupliquera l'écriture et toutes les données associées.
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
