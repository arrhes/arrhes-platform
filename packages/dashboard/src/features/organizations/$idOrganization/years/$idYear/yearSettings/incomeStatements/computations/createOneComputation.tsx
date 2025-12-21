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
import { createOneComputationRouteDefinition, readAllComputationsRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
import { JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"


export function CreateOneComputation(props: {
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
                    title="Ajouter une nouvelle ligne de calcul"
                />
                <Drawer.Body>
                    <FormRoot
                        schema={createOneComputationRouteDefinition.schemas.body}
                        defaultValues={{
                            idOrganization: props.idOrganization,
                            idYear: props.idYear,
                        }}
                        submitButtonProps={{
                            icon: <IconPlus />,
                            text: "Ajouter la ligne de calcul",
                        }}
                        onSubmit={async (data) => {
                            const createComputationResponse = await postAPI({
                                routeDefinition: createOneComputationRouteDefinition,
                                body: data,
                            })
                            if (createComputationResponse.ok === false) {
                                toast({ title: "Impossible d'ajouter la ligne de calcul", variant: "error" })
                                return false
                            }

                            toast({ title: "Ligne de calcul ajouté avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {

                            await invalidateData({
                                routeDefinition: readAllComputationsRouteDefinition,
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
                                    name="number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Numéro"
                                                tooltip="Le numéro qui définit la ligne de calcul ajoutée."
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
                                                tooltip="Le libellé qui définit la ligne de calcul ajoutée."
                                                isRequired={true}
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
