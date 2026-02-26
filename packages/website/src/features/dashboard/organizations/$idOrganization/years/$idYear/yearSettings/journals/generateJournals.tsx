import { generateJournalsRouteDefinition, readAllJournalsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonGhostContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconRefresh } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import type * as v from "valibot"
import { Dialog } from "../../../../../../../../components/overlays/dialog/dialog.tsx"
import { toast } from "../../../../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../../../utilities/invalidateData.ts"

export function GenerateJournals(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog.Root open={open} onOpenChange={(value) => setOpen(value)}>
            <Dialog.Trigger
                onClick={(event) => {
                    setOpen(true)
                    event.preventDefault()
                }}
            >
                {props.children}
            </Dialog.Trigger>
            {open === false ? null : (
                <Dialog.Content>
                    <Dialog.Header />
                    <div
                        className={css({
                            padding: "4",
                            pt: "0",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            gap: "1",
                        })}
                    >
                        <Dialog.Title>Voulez-vous générer les journaux par défaut ?</Dialog.Title>
                        <Dialog.Description>
                            Cette action supprimera les anciens journaux pour générer ceux par défaut.
                            <br />
                            Cette action est irréversible.
                        </Dialog.Description>
                    </div>
                    <Dialog.Footer>
                        <Button
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            <ButtonGhostContent text="Annuler" />
                        </Button>
                        <Button
                            onClick={async () => {
                                const response = await getResponseBodyFromAPI({
                                    routeDefinition: generateJournalsRouteDefinition,
                                    body: {
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
                                        idYear: props.idYear,
                                    },
                                })

                                setOpen(false)
                                return true
                            }}
                            hasLoader
                        >
                            <ButtonPlainContent leftIcon={<IconRefresh />} text="Générer les journaux" />
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            )}
        </Dialog.Root>
    )
}
