import { readAllBalanceSheetsRouteDefinition, readOneBalanceSheetRouteDefinition, updateOneBalanceSheetRouteDefinition } from "@arrhes/schemas/routes"
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


export function UpdateOneBalanceSheet(props: {
    balanceSheet: v.InferOutput<typeof returnedSchemas.balanceSheet>
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
                    title="Modifier la ligne de bilan"
                />
                <Drawer.Body>
                    <FormRoot
                        schema={updateOneBalanceSheetRouteDefinition.schemas.body}
                        defaultValues={{
                            ...props.balanceSheet,
                            idBalanceSheet: props.balanceSheet.id,
                        }}
                        submitButtonProps={{
                            icon: <IconPlus />,
                            text: "Modifier la ligne de bilan",
                        }}
                        onSubmit={async (data) => {
                            const updateBalanceSheetResponse = await postAPI({
                                routeDefinition: updateOneBalanceSheetRouteDefinition,
                                body: data,
                            })
                            if (updateBalanceSheetResponse.ok === false) {
                                toast({ title: "Impossible de modifier la ligne de bilan", variant: "error" })
                                return false
                            }

                            toast({ title: "Ligne de bilan modifiée avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {

                            await invalidateData({
                                routeDefinition: readAllBalanceSheetsRouteDefinition,
                                body: {
                                    idOrganization: props.balanceSheet.idOrganization,
                                    idYear: props.balanceSheet.idYear,
                                },
                            })

                            await invalidateData({
                                routeDefinition: readOneBalanceSheetRouteDefinition,
                                body: {
                                    idBalanceSheet: props.balanceSheet.id,
                                    idOrganization: props.balanceSheet.idOrganization,
                                    idYear: props.balanceSheet.idYear,
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
                                                    idOrganization={props.balanceSheet.idOrganization}
                                                    idYear={props.balanceSheet.idYear}
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
