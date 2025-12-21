import { FormControl } from "#/components/forms/formControl.js"
import { FormError } from "#/components/forms/formError.js"
import { FormField } from "#/components/forms/formField.js"
import { FormItem } from "#/components/forms/formItem.js"
import { FormLabel } from "#/components/forms/formLabel.js"
import { FormRoot } from "#/components/forms/formRoot.js"
import { InputText } from "#/components/inputs/inputText.js"
import { Drawer } from "#/components/overlays/drawer/drawer.js"
import { toast } from "#/contexts/toasts/useToast.js"
import { invalidateData } from "#/utilities/invalidateData.js"
import { postAPI } from "#/utilities/postAPI.js"
import { readAllRecordLabelsRouteDefinition, readOneRecordLabelRouteDefinition, updateOneRecordLabelRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
import { JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"


export function UpdateOneRecordLabel(props: {
    recordLabel: v.InferOutput<typeof returnedSchemas.recordLabel>
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
                    title="Modifier la catégorie"
                />
                <Drawer.Body>
                    <FormRoot
                        schema={updateOneRecordLabelRouteDefinition.schemas.body}
                        defaultValues={{
                            ...props.recordLabel,
                            idRecordLabel: props.recordLabel.id,
                        }}
                        submitButtonProps={{
                            icon: <IconPlus />,
                            text: "Modifier la catégorie",
                        }}
                        onSubmit={async (data) => {
                            const updateRecordLabelResponse = await postAPI({
                                routeDefinition: updateOneRecordLabelRouteDefinition,
                                body: data,
                            })
                            if (updateRecordLabelResponse.ok === false) {
                                toast({ title: "Impossible de modifier la catégorie", variant: "error" })
                                return false
                            }

                            toast({ title: "Catégorie modifiée avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {

                            await invalidateData({
                                routeDefinition: readAllRecordLabelsRouteDefinition,
                                body: {
                                    idOrganization: props.recordLabel.idOrganization,
                                    idYear: props.recordLabel.idYear,
                                },
                            })

                            await invalidateData({
                                routeDefinition: readOneRecordLabelRouteDefinition,
                                body: {
                                    idRecordLabel: props.recordLabel.id,
                                    idOrganization: props.recordLabel.idOrganization,
                                    idYear: props.recordLabel.idYear,
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
                                                tooltip="Le libellé qui définit la catégorie ajoutée."
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
