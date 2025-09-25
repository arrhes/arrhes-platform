import { FormControl } from "#/components/forms/formControl.js"
import { FormError } from "#/components/forms/formError.js"
import { FormField } from "#/components/forms/formField.js"
import { FormItem } from "#/components/forms/formItem.js"
import { FormLabel } from "#/components/forms/formLabel.js"
import { FormRoot } from "#/components/forms/formRoot.js"
import { InputDataCombobox } from "#/components/inputs/inputDataCombobox.js"
import { InputPrice } from "#/components/inputs/inputNumber.js"
import { InputText } from "#/components/inputs/inputText.js"
import { InputToggle } from "#/components/inputs/inputToggle.js"
import { Drawer } from "#/components/overlays/drawer/drawer.js"
import { toast } from "#/contexts/toasts/useToast.js"
import { invalidateData } from "#/utilities/invalidateData.js"
import { postAPI } from "#/utilities/postAPI.js"
import { createOneRecordRowRouteDefinition, readAllAccountsRouteDefinition, readAllRecordRowsRouteDefinition, readOneRecordRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
import { JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"


export function CreateOneRecordRow(props: {
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
                    title="Ajouter un nouveau mouvement"
                />
                <Drawer.Body>
                    <FormRoot
                        schema={createOneRecordRowRouteDefinition.schemas.body}
                        defaultValues={{
                            idOrganization: props.record.idOrganization,
                            idYear: props.record.idYear,
                            idRecord: props.record.id,
                            isComputed: true,
                        }}
                        submitButtonProps={{
                            icon: <IconPlus />,
                            text: "Ajouter le mouvement",
                        }}
                        onSubmit={async (data) => {
                            const createRecordRowResponse = await postAPI({
                                routeDefinition: createOneRecordRowRouteDefinition,
                                body: data,
                            })
                            if (createRecordRowResponse.ok === false) {
                                toast({ title: "Impossible d'ajouter le mouvement", variant: "error" })
                                return false
                            }

                            toast({ title: "Mouvement ajouté avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {

                            await invalidateData({
                                routeDefinition: readOneRecordRouteDefinition,
                                body: {
                                    idOrganization: props.record.idOrganization,
                                    idYear: props.record.idYear,
                                    idRecord: props.record.id,
                                },
                            })

                            await invalidateData({
                                routeDefinition: readAllRecordRowsRouteDefinition,
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
                                                isRequired={false}
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
                                    name="idAccount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Compte"
                                                isRequired={true}
                                            />
                                            <FormControl>
                                                <InputDataCombobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    routeDefinition={readAllAccountsRouteDefinition}
                                                    body={{
                                                        idOrganization: props.record.idOrganization,
                                                        idYear: props.record.idYear,
                                                    }}
                                                    placeholder="Sélectionner un compte"
                                                    getOption={(journal) => ({
                                                        key: journal.id,
                                                        label: `${journal.number} - ${journal.label}`
                                                    })}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-start items-start gap-1">
                                    <FormField
                                        control={form.control}
                                        name="debit"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Débit"
                                                    isRequired={false}
                                                />
                                                <FormControl>
                                                    <InputPrice
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
                                        name="credit"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Crédit"
                                                    isRequired={false}
                                                />
                                                <FormControl>
                                                    <InputPrice
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormError />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="isComputed"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Mouvement ajouté aux calculs ?"
                                                isRequired={true}
                                            />
                                            <FormControl>
                                                <InputToggle
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    options={[
                                                        { value: true, label: "Oui" },
                                                        { value: false, label: "Non" }
                                                    ]}
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
