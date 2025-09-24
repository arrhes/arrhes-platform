import { createOneBalanceSheetRouteDefinition, readAllBalanceSheetsRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { IconPlus } from "@tabler/icons-react"
import { FormControl } from "components/forms/formControl"
import { FormError } from "components/forms/formError"
import { FormField } from "components/forms/formField"
import { FormItem } from "components/forms/formItem"
import { FormLabel } from "components/forms/formLabel"
import { FormRoot } from "components/forms/formRoot"
import { InputText } from "components/inputs/inputText"
import { InputToggle } from "components/inputs/inputToggle"
import { Drawer } from "components/overlays/drawer/drawer"
import { toast } from "contexts/toasts/useToast"
import { BalanceSheetsSelect } from "features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetSelect"
import { JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import { invalidateData } from "utilities/invalidateData"
import { postAPI } from "utilities/postAPI"
import * as v from "valibot"


export function CreateOneBalanceSheet(props: {
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
                    title="Ajouter une nouvelle ligne de bilan"
                />
                <Drawer.Body>
                    <FormRoot
                        schema={createOneBalanceSheetRouteDefinition.schemas.body}
                        defaultValues={{
                            idOrganization: props.idOrganization,
                            idYear: props.idYear,
                            idBalanceSheetParent: null,
                            side: "asset",
                        }}
                        submitButtonProps={{
                            icon: <IconPlus />,
                            text: "Ajouter la ligne de bilan",
                        }}
                        onSubmit={async (data) => {
                            const createBalanceSheetResponse = await postAPI({
                                routeDefinition: createOneBalanceSheetRouteDefinition,
                                body: data,
                            })
                            if (createBalanceSheetResponse.ok === false) {
                                toast({ title: "Impossible d'ajouter la ligne de bilan", variant: "error" })
                                return false
                            }

                            toast({ title: "Ligne de bilan ajouté avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {

                            await invalidateData({
                                routeDefinition: readAllBalanceSheetsRouteDefinition,
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
                                                tooltip="Le numéro qui définit la ligne de bilan ajoutée."
                                                isRequired
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
                                <FormField
                                    control={form.control}
                                    name="label"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Libellé"
                                                tooltip="Le libellé qui définit la ligne de bilan ajoutée."
                                                isRequired
                                            />
                                            <FormControl>
                                                <InputText
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    autoFocus
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="idBalanceSheetParent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Ligne de bilan parent"
                                                tooltip="La ligne de bilan parent de la ligne créée."
                                            />
                                            <FormControl>
                                                <BalanceSheetsSelect
                                                    idOrganization={props.idOrganization}
                                                    idYear={props.idYear}
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
                                    name="side"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Côté du bilan ?"
                                            />
                                            <FormControl>
                                                <InputToggle
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    options={[
                                                        { label: "Actif", value: "asset" },
                                                        { label: "Passif", value: "liability" }
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
