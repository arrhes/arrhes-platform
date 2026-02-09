import { deleteOneComputationIncomeStatementRouteDefinition, readAllComputationIncomeStatementsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconTrash } from "@tabler/icons-react"
import { ComponentPropsWithRef, ReactElement, useState } from "react"
import * as v from "valibot"
import { Dialog } from "../../../../../../../../../../../../components/overlays/dialog/dialog.tsx"
import { toast } from "../../../../../../../../../../../../contexts/toasts/useToast.ts"
import { platformRouter } from "../../../../../../../../../../../../routes/platformRouter.tsx"
import { invalidateData } from "../../../../../../../../../../../../utilities/invalidateData.ts"
import { postAPI } from "../../../../../../../../../../../../utilities/postAPI.ts"


export function DeleteOneComputationIncomeStatement(props: {
    computationIncomeStatement: v.InferOutput<typeof returnedSchemas.computationIncomeStatement>
    children: ReactElement<ComponentPropsWithRef<'div'>>
}) {
    const [open, setOpen] = useState(false)

    async function onSubmit() {
        const deleteResponse = await postAPI({
            routeDefinition: deleteOneComputationIncomeStatementRouteDefinition,
            body: {
                idComputationIncomeStatement: props.computationIncomeStatement.id,
                idOrganization: props.computationIncomeStatement.idOrganization,
                idYear: props.computationIncomeStatement.idYear,
            }
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression de la ligne de compte de résultat", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllComputationIncomeStatementsRouteDefinition,
            body: {
                idOrganization: props.computationIncomeStatement.idOrganization,
                idYear: props.computationIncomeStatement.idYear,
            },
        })

        toast({ title: "Ligne de compte de résultat supprimée", variant: "success" })

        platformRouter.navigate({
            to: "/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat",
            params: {
                idOrganization: props.computationIncomeStatement.idOrganization,
                idYear: props.computationIncomeStatement.idYear
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
                        <div className={css({ p: "4", pt: "0", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "1" })}>
                            <Dialog.Title>
                                Voulez-vous supprimer cette ligne de compte de résultat ?
                            </Dialog.Title>
                            <Dialog.Description>
                                Cette action supprimera la ligne de compte de résultat et toutes les données associées.
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
                                text="Supprimer la ligne de compte de résultat"
                                hasLoader
                            />
                        </Dialog.Footer>
                    </Dialog.Content>
                )
            }
        </Dialog.Root>
    )
}
