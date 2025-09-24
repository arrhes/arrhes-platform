import { readAllJournalsRouteDefinition, readOneJournalRouteDefinition, updateOneJournalRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { IconPlus } from "@tabler/icons-react"
import { FormControl } from "components/forms/formControl"
import { FormError } from "components/forms/formError"
import { FormField } from "components/forms/formField"
import { FormItem } from "components/forms/formItem"
import { FormLabel } from "components/forms/formLabel"
import { FormRoot } from "components/forms/formRoot"
import { InputText } from "components/inputs/inputText"
import { Drawer } from "components/overlays/drawer/drawer"
import { toast } from "contexts/toasts/useToast"
import { JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import { invalidateData } from "utilities/invalidateData"
import { postAPI } from "utilities/postAPI"
import * as v from "valibot"


export function UpdateOneJournal(props: {
    journal: v.InferOutput<typeof returnedSchemas.journal>
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root
            open={open}
            onOpenChange={setOpen}
        >
            <Drawer.Trigger>
                {props.children}
            </Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header
                    title="Modifier le journal"
                />
                <Drawer.Body>
                    <FormRoot
                        schema={updateOneJournalRouteDefinition.schemas.body}
                        defaultValues={{
                            ...props.journal,
                            idJournal: props.journal.id,
                        }}
                        submitButtonProps={{
                            icon: <IconPlus />,
                            text: "Modifier le journal",
                        }}
                        onSubmit={async (data) => {
                            const updateJournalResponse = await postAPI({
                                routeDefinition: updateOneJournalRouteDefinition,
                                body: data,
                            })
                            if (updateJournalResponse.ok === false) {
                                toast({ title: "Impossible de modifier le journal", variant: "error" })
                                return false
                            }

                            toast({ title: "Journal modifié avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {

                            await invalidateData({
                                routeDefinition: readAllJournalsRouteDefinition,
                                body: {
                                    idOrganization: props.journal.idOrganization,
                                    idYear: props.journal.idYear,
                                },
                            })

                            await invalidateData({
                                routeDefinition: readOneJournalRouteDefinition,
                                body: {
                                    idJournal: props.journal.id,
                                    idOrganization: props.journal.idOrganization,
                                    idYear: props.journal.idYear,
                                },
                            })

                            setOpen(false)
                        }}
                    >
                        {(form) => (
                            <Fragment>
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Code"
                                                tooltip="Le code qui référence le journal ajouté."
                                                isRequired={true}
                                            />
                                            <FormControl>
                                                <InputText
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    autoFocus={true}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="label"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Libellé"
                                                tooltip="Le libellé qui définit le journal ajouté."
                                                isRequired={false}
                                            />
                                            <FormControl>
                                                <InputText
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                            </Fragment>
                        )}
                    </FormRoot>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
