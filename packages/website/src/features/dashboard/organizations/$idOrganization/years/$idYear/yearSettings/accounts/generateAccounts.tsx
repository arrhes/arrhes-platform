import { generateAccountsRouteDefinition, readAllAccountsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../../../../components/forms/formControl.tsx"
import { FormError } from "../../../../../../../../components/forms/formError.tsx"
import { FormField } from "../../../../../../../../components/forms/formField.tsx"
import { FormItem } from "../../../../../../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../../../../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../../../../../../components/forms/formRoot.tsx"
import { InputToggle } from "../../../../../../../../components/inputs/inputToggle.tsx"
import { Drawer } from "../../../../../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../../../utilities/invalidateData.ts"

export function GenerateAccounts(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Générer les comptes" />
                <Drawer.Body>
                    <FormRoot
                        schema={generateAccountsRouteDefinition.schemas.body}
                        defaultValues={{
                            idOrganization: props.idOrganization,
                            idYear: props.idYear,
                            isMinimalSystem: true,
                            isReplicatingAccounts: false,
                        }}
                        submitButtonProps={{
                            leftIcon: <IconPlus />,
                            text: "Générer les comptes",
                        }}
                        onSubmit={async (data) => {
                            const response = await getResponseBodyFromAPI({
                                routeDefinition: generateAccountsRouteDefinition,
                                body: data,
                            })
                            if (!response.ok) {
                                toast({ title: "Impossible de générer les comptes", variant: "error" })
                                return false
                            }

                            toast({ title: "Comptes générés avec succès", variant: "success" })
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
                                {/* <FormField
                                    control={form.control}
                                    name="isReplicatingAccounts"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Réplication des comptes précédents ?"
                                                isRequired={true}
                                                description={undefined}
                                                tooltip={undefined}
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
                                /> */}
                                <FormField
                                    control={form.control}
                                    name="isMinimalSystem"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Système de compte minimal ?"
                                                isRequired={true}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputToggle
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    options={[
                                                        { value: true, label: "Oui" },
                                                        { value: false, label: "Non" },
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
