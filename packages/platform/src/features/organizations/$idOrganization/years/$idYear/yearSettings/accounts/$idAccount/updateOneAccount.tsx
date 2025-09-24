import { readAllAccountsRouteDefinition, readOneAccountRouteDefinition, updateOneAccountRouteDefinition } from "@arrhes/schemas/routes"
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
import { AccountSelect } from "features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountSelect"
import { JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import { invalidateData } from "utilities/invalidateData"
import { postAPI } from "utilities/postAPI"
import * as v from "valibot"


export function UpdateOneAccount(props: {
    account: v.InferOutput<typeof returnedSchemas.account>
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
                    title="Modifier le compte"
                />
                <Drawer.Body>
                    <FormRoot
                        schema={updateOneAccountRouteDefinition.schemas.body}
                        defaultValues={{
                            ...props.account,
                            idAccount: props.account.id,
                        }}
                        submitButtonProps={{
                            icon: <IconPlus />,
                            text: "Modifier le compte",
                        }}
                        onSubmit={async (data) => {
                            const updateAccountResponse = await postAPI({
                                routeDefinition: updateOneAccountRouteDefinition,
                                body: data,
                            })
                            if (updateAccountResponse.ok === false) {
                                toast({ title: "Impossible de modifier le compte", variant: "error" })
                                return false
                            }

                            toast({ title: "Compte modifié avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {

                            await invalidateData({
                                routeDefinition: readAllAccountsRouteDefinition,
                                body: {
                                    idOrganization: props.account.idOrganization,
                                    idYear: props.account.idYear,
                                },
                            })

                            await invalidateData({
                                routeDefinition: readOneAccountRouteDefinition,
                                body: {
                                    idAccount: props.account.id,
                                    idOrganization: props.account.idOrganization,
                                    idYear: props.account.idYear,
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
                                                tooltip="Le numéro qui définit le compte ajouté."
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
                                                tooltip="Le libellé qui définit le compte ajouté."
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
                                    name="idAccountParent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Compte parent"
                                                tooltip="Le compte parent du compte créé."
                                            />
                                            <FormControl>
                                                <AccountSelect
                                                    idOrganization={props.account.idOrganization}
                                                    idYear={props.account.idYear}
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
                                    name="isClass"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Classe/sous-classe ?"
                                                tooltip="Le compte est une classe ou une sous-classe de compte."
                                            />
                                            <FormControl>
                                                <InputToggle
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    options={[
                                                        { label: "Oui", value: true },
                                                        { label: "Non", value: false }
                                                    ]}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isSelectable"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Sélectionnable ?"
                                                tooltip="Le compte est sélectionnable pour les écritures."
                                            />
                                            <FormControl>
                                                <InputToggle
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    options={[
                                                        { label: "Oui", value: true },
                                                        { label: "Non", value: false }
                                                    ]}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Type de compte"
                                            // tooltip="Si le compte est de bilan, de gestion ou spécial."
                                            />
                                            <FormControl>
                                                <InputToggle
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    options={[
                                                        { label: "Compte de bilan", value: "balance-sheet" },
                                                        { label: "Compte de gestion", value: "income-statement" },
                                                        { label: "Compte spécial", value: "special" }
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
