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
import { invalidateData } from "#/utilities/invalidateData.js"
import { postAPI } from "#/utilities/postAPI.js"
import { readAllAttachmentsRouteDefinition, readAllJournalsRouteDefinition, readAllRecordLabelsRouteDefinition, readAllRecordsRouteDefinition, readOneRecordRouteDefinition, updateOneRecordRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPencil } from "@tabler/icons-react"
import { JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"


export function UpdateOneRecord(props: {
    record: v.InferOutput<typeof returnedSchemas.record>
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
                    title="Modifier une écriture"
                />
                <Drawer.Body>
                    <FormRoot
                        schema={updateOneRecordRouteDefinition.schemas.body}
                        defaultValues={{
                            ...props.record,
                            idRecord: props.record.id,
                        }}
                        submitButtonProps={{
                            icon: <IconPencil />,
                            text: "Modifier l'écriture",
                        }}
                        onSubmit={async (data) => {
                            const updateRecordResponse = await postAPI({
                                routeDefinition: updateOneRecordRouteDefinition,
                                body: data,
                            })
                            if (updateRecordResponse.ok === false) {
                                toast({ title: "Impossible de modifier l'écriture", variant: "error" })
                                return false
                            }

                            toast({ title: "Écriture modifiée avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {

                            await invalidateData({
                                routeDefinition: readAllRecordsRouteDefinition,
                                body: {
                                    idOrganization: props.record.idOrganization,
                                    idYear: props.record.idYear,
                                },
                            })

                            await invalidateData({
                                routeDefinition: readOneRecordRouteDefinition,
                                body: {
                                    idOrganization: props.record.idOrganization,
                                    idYear: props.record.idYear,
                                    idRecord: props.record.id,
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
                                                        idOrganization: props.record.idOrganization,
                                                        idYear: props.record.idYear,
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
                                    name="idRecordLabel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Catégorie"
                                                isRequired={false}
                                            />
                                            <FormControl>
                                                <InputDataCombobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    routeDefinition={readAllRecordLabelsRouteDefinition}
                                                    body={{
                                                        idOrganization: props.record.idOrganization,
                                                        idYear: props.record.idYear,
                                                    }}
                                                    placeholder="Sélectionner une catégorie"
                                                    getOption={(recordLabel) => ({
                                                        key: recordLabel.id,
                                                        label: `${recordLabel.label}`
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
                                                        idOrganization: props.record.idOrganization,
                                                        idYear: props.record.idYear,
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
