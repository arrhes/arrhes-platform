import { generateBalanceSheetsRouteDefinition, readAllBalanceSheetsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconRefresh } from "@tabler/icons-react"
import { JSX, useState } from "react"
import * as v from "valibot"
import { Dialog } from "../../../../../../../../components/overlays/dialog/dialog.tsx"
import { toast } from "../../../../../../../../contexts/toasts/useToast.ts"
import { invalidateData } from "../../../../../../../../utilities/invalidateData.ts"
import { postAPI } from "../../../../../../../../utilities/postAPI.ts"


export function GenerateBalanceSheets(props: {
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
                        <div className={css({ p: "4", pt: "0", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "1" })}>
                            <Dialog.Title>
                                Voulez-vous générer les lignes de bilan par défaut ?
                            </Dialog.Title>
                            <Dialog.Description>
                                Cette action supprimera les anciennes lignes de bilan pour générer celles par défaut.
                                <br />
                                Cette action est irréversible.
                            </Dialog.Description>
                        </div>
                        <Dialog.Footer>
                            <Button
                                variant="invisible"
                                text="Annuler"
                                onClick={() => {
                                    setOpen(false)
                                }}
                            />
                            <Button
                                variant="primary"
                                icon={<IconRefresh />}
                                onClick={async () => {
                                    const response = await postAPI({
                                        routeDefinition: generateBalanceSheetsRouteDefinition,
                                        body: {
                                            idOrganization: props.idOrganization,
                                            idYear: props.idYear,
                                        },
                                    })
                                    if (!response.ok) {
                                        toast({ title: "Impossible de générer les lignes de bilan", variant: "error" })
                                        return false
                                    }

                                    toast({ title: "Lignes de bilan générées avec succès", variant: "success" })

                                    await invalidateData({
                                        routeDefinition: readAllBalanceSheetsRouteDefinition,
                                        body: {
                                            idOrganization: props.idOrganization,
                                            idYear: props.idYear
                                        },
                                    })

                                    setOpen(false)
                                    return true
                                }}
                                text="Générer les lignes de bilan"
                                hasLoader
                            />
                        </Dialog.Footer>
                    </Dialog.Content>
                )
            }
        </Dialog.Root>
    )
}
