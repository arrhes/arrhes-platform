import { generateJournalsRouteDefinition, readAllJournalsRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { IconRefresh } from "@tabler/icons-react"
import { ButtonGhost } from "components/buttons/buttonGhost"
import { ButtonPlain } from "components/buttons/buttonPlain"
import { Dialog } from "components/overlays/dialog/dialog"
import { toast } from "contexts/toasts/useToast"
import { JSX, useState } from "react"
import { invalidateData } from "utilities/invalidateData"
import { postAPI } from "utilities/postAPI"
import * as v from "valibot"


export function GenerateJournals(props: {
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
                                Voulez-vous générer les journaux par défaut ?
                            </Dialog.Title>
                            <Dialog.Description>
                                Cette action supprimera les anciens journaux pour générer ceux par défaut.
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
                                        routeDefinition: generateJournalsRouteDefinition,
                                        body: {
                                            idOrganization: props.idOrganization,
                                            idYear: props.idYear,
                                        },
                                    })
                                    if (!response.ok) {
                                        toast({ title: "Impossible de générer les journaux", variant: "error" })
                                        return false
                                    }

                                    toast({ title: "Journaux générées avec succès", variant: "success" })

                                    await invalidateData({
                                        routeDefinition: readAllJournalsRouteDefinition,
                                        body: {
                                            idOrganization: props.idOrganization,
                                            idYear: props.idYear
                                        },
                                    })

                                    setOpen(false)
                                    return true
                                }}
                                text="Générer les journaux"
                                hasLoader
                            />
                        </Dialog.Footer>
                    </Dialog.Content>
                )
            }
        </Dialog.Root>
    )
}
