import { ButtonGhost } from "#/components/buttons/buttonGhost.js"
import { ButtonPlain } from "#/components/buttons/buttonPlain.js"
import { Dialog } from "#/components/overlays/dialog/dialog.js"
import { toast } from "#/contexts/toasts/useToast.js"
import { invalidateData } from "#/utilities/invalidateData.js"
import { postAPI } from "#/utilities/postAPI.js"
import { generateIncomeStatementsRouteDefinition, readAllIncomeStatementsRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { IconRefresh } from "@tabler/icons-react"
import { JSX, useState } from "react"
import * as v from "valibot"


export function GenerateIncomeStatements(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

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
                                Voulez-vous générer les lignes de compte de résultat par défaut ?
                            </Dialog.Title>
                            <Dialog.Description>
                                Cette action supprimera les anciennes lignes de compte de résultat pour générer celles par défaut.
                                <br />
                                Cette action est irréversible.
                            </Dialog.Description>
                        </div>
                        <Dialog.Footer>
                            <ButtonGhost
                                text="Annuler"
                                onClick={() => {
                                    setOpen(false)
                                }}
                            />
                            <ButtonPlain
                                icon={<IconRefresh />}
                                onClick={async () => {
                                    const response = await postAPI({
                                        routeDefinition: generateIncomeStatementsRouteDefinition,
                                        body: {
                                            idOrganization: props.idOrganization,
                                            idYear: props.idYear,
                                        },
                                    })
                                    if (!response.ok) {
                                        toast({ title: "Impossible de générer les lignes de compte de résultat", variant: "error" })
                                        return false
                                    }

                                    toast({ title: "Lignes de compte de résultat générées avec succès", variant: "success" })

                                    await invalidateData({
                                        routeDefinition: readAllIncomeStatementsRouteDefinition,
                                        body: {
                                            idOrganization: props.idOrganization,
                                            idYear: props.idYear
                                        },
                                    })

                                    setOpen(false)
                                    return true
                                }}
                                text="Générer les lignes de compte de résultat"
                                hasLoader
                            />
                        </Dialog.Footer>
                    </Dialog.Content>
                )
            }
        </Dialog.Root>
    )
}
