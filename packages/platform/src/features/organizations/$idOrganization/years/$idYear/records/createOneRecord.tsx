import { FormControl } from "#/components/forms/formControl.js"
import { FormError } from "#/components/forms/formError.js"
import { FormField } from "#/components/forms/formField.js"
import { FormItem } from "#/components/forms/formItem.js"
import { FormLabel } from "#/components/forms/formLabel.js"
import { FormRoot } from "#/components/forms/formRoot.js"
import { InputDataCombobox } from "#/components/inputs/inputDataCombobox.js"
import { InputDate } from "#/components/inputs/inputDate.js"
import { InputText } from "#/components/inputs/inputText.js"
import { Drawer } from "#/components/overlays/drawer/drawer.js"
import { toast } from "#/contexts/toasts/useToast.js"
import { platformRouter } from "#/routes/platformRouter.js"
import { invalidateData } from "#/utilities/invalidateData.js"
import { postAPI } from "#/utilities/postAPI.js"
import { createOneRecordRouteDefinition, readAllAttachmentsRouteDefinition, readAllJournalsRouteDefinition, readAllRecordsRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
import { JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"


export function CreateOneRecord(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
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
                    title="Ajouter une nouvelle écriture"
                />
                <Drawer.Body>
                    <FormRoot
                        schema={createOneRecordRouteDefinition.schemas.body}
                        defaultValues={{
                            idOrganization: props.idOrganization,
                            idYear: props.idYear,
                            idAttachment: null,
                            idJournal: null,
                        }}
                        submitButtonProps={{
                            icon: <IconPlus />,
                            text: "Ajouter l'écriture",
                        }}
                        onSubmit={async (data) => {
                            const createRecordResponse = await postAPI({
                                routeDefinition: createOneRecordRouteDefinition,
                                body: data,
                            })
                            if (createRecordResponse.ok === false) {
                                toast({ title: "Impossible d'ajouter l'écriture", variant: "error" })
                                return false
                            }

                            toast({ title: "Écriture ajoutée avec succès", variant: "success" })
                            platformRouter.navigate({
                                to: "/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord",
                                params: {
                                    idOrganization: props.idOrganization,
                                    idYear: props.idYear,
                                    idRecord: createRecordResponse.data.id,
                                }
                            })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {

                            await invalidateData({
                                routeDefinition: readAllRecordsRouteDefinition,
                                body: {
                                    idOrganization: props.idOrganization,
                                    idYear: props.idYear,
                                },
                            })

                            setOpen(false)
                        }}
                    >
                        {(form) => (
                            <Fragment>
                                <FormField
                                    control={form.control}
                                    name="label"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Libellé"
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
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Date"
                                                isRequired={true}
                                            />
                                            <FormControl>
                                                <InputDate
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="idJournal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Journal"
                                                isRequired={false}
                                            />
                                            <FormControl>
                                                <InputDataCombobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    routeDefinition={readAllJournalsRouteDefinition}
                                                    body={{
                                                        idOrganization: props.idOrganization,
                                                        idYear: props.idYear,
                                                    }}
                                                    placeholder="Sélectionner un journal"
                                                    getOption={(journal) => ({
                                                        key: journal.id,
                                                        label: `(${journal.code}) ${journal.label}`
                                                    })}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="idAttachment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Pièce justificative"
                                                isRequired={false}
                                            />
                                            <FormControl>
                                                <InputDataCombobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    routeDefinition={readAllAttachmentsRouteDefinition}
                                                    body={{
                                                        idOrganization: props.idOrganization,
                                                        idYear: props.idYear,
                                                    }}
                                                    placeholder="Sélectionner une pièce justificative"
                                                    getOption={(attachment) => ({
                                                        key: attachment.id,
                                                        label: attachment.reference
                                                    })}
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
