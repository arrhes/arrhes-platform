import { FormControl } from "#/components/forms/formControl.js"
import { FormError } from "#/components/forms/formError.js"
import { FormField } from "#/components/forms/formField.js"
import { FormItem } from "#/components/forms/formItem.js"
import { FormLabel } from "#/components/forms/formLabel.js"
import { FormRoot } from "#/components/forms/formRoot.js"
import { InputText } from "#/components/inputs/inputText.js"
import { InputToggle } from "#/components/inputs/inputToggle.js"
import { Drawer } from "#/components/overlays/drawer/drawer.js"
import { toast } from "#/contexts/toasts/useToast.js"
import { AccountSelect } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountSelect.js"
import { BalanceSheetsSelect } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetSelect.js"
import { invalidateData } from "#/utilities/invalidateData.js"
import { postAPI } from "#/utilities/postAPI.js"
import { createOneAccountRouteDefinition, readAllAccountsRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
import { JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"


export function CreateOneAccount(props: {
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
                    title="Ajouter un nouveau fichier"
                />
                <Drawer.Body>
                    <FormRoot
                        schema={createOneAccountRouteDefinition.schemas.body}
                        defaultValues={{
                            idOrganization: props.idOrganization,
                            idYear: props.idYear,
                            isClass: false,
                            isSelectable: true,
                            type: "balance-sheet",
                        }}
                        submitButtonProps={{
                            icon: <IconPlus />,
                            text: "Ajouter le compte",
                        }}
                        onSubmit={async (data) => {
                            const createAccountResponse = await postAPI({
                                routeDefinition: createOneAccountRouteDefinition,
                                body: data,
                            })
                            if (createAccountResponse.ok === false) {
                                toast({ title: "Impossible d'ajouter le compte", variant: "error" })
                                return false
                            }

                            toast({ title: "Compte ajouté avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {

                            await invalidateData({
                                routeDefinition: readAllAccountsRouteDefinition,
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
                                <FormField
                                    control={form.control}
                                    name="idBalanceSheetAsset"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Ligne de bilan associée (actif)"
                                                tooltip="La ligne de bilan associée (actif) au compte créé."
                                            />
                                            <FormControl>
                                                <BalanceSheetsSelect
                                                    idOrganization={props.idOrganization}
                                                    idYear={props.idYear}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    side="asset"
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="balanceSheetAssetColumn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Colonne de ligne de bilan associée (actif)"
                                                tooltip="Colonne de la ligne de bilan associée (actif) au compte créé."
                                            />
                                            <FormControl>
                                                <InputToggle
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    options={[
                                                        { label: "Brut", value: "gross" },
                                                        { label: "Amort. & Dépré.", value: "amortization" },
                                                    ]}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="idBalanceSheetLiability"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Ligne de bilan associée (passif)"
                                                tooltip="La ligne de bilan associée (passif) au compte créé."
                                            />
                                            <FormControl>
                                                <BalanceSheetsSelect
                                                    idOrganization={props.idOrganization}
                                                    idYear={props.idYear}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    side="liability"
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
