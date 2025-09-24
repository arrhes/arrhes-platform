import { createOneComputationIncomeStatementRouteDefinition, readAllComputationIncomeStatementsRouteDefinition, readAllIncomeStatementsRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { IconPlus } from "@tabler/icons-react"
import { FormControl } from "components/forms/formControl"
import { FormError } from "components/forms/formError"
import { FormField } from "components/forms/formField"
import { FormItem } from "components/forms/formItem"
import { FormLabel } from "components/forms/formLabel"
import { FormRoot } from "components/forms/formRoot"
import { InputDataCombobox } from "components/inputs/inputDataCombobox"
import { InputToggle } from "components/inputs/inputToggle"
import { Drawer } from "components/overlays/drawer/drawer"
import { toast } from "contexts/toasts/useToast"
import { JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import { invalidateData } from "utilities/invalidateData"
import { postAPI } from "utilities/postAPI"
import * as v from "valibot"


export function CreateOneComputationIncomeStatement(props: {
    computation: v.InferOutput<typeof returnedSchemas.computation>
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
                    title="Ajouter un nouveau terme au calcul"
                />
                <Drawer.Body>
                    <FormRoot
                        schema={createOneComputationIncomeStatementRouteDefinition.schemas.body}
                        defaultValues={{
                            idOrganization: props.computation.idOrganization,
                            idYear: props.computation.idYear,
                            operation: "plus",
                        }}
                        submitButtonProps={{
                            icon: <IconPlus />,
                            text: "Ajouter le terme du calcul",
                        }}
                        onSubmit={async (data) => {
                            const createComputationIncomeStatementResponse = await postAPI({
                                routeDefinition: createOneComputationIncomeStatementRouteDefinition,
                                body: data,
                            })
                            if (createComputationIncomeStatementResponse.ok === false) {
                                toast({ title: "Impossible d'ajouter le terme du calcul", variant: "error" })
                                return false
                            }

                            toast({ title: "Terme du calcul ajouté avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {

                            await invalidateData({
                                routeDefinition: readAllComputationIncomeStatementsRouteDefinition,
                                body: {
                                    idOrganization: props.computation.idOrganization,
                                    idYear: props.computation.idYear,
                                },
                            })

                            setOpen(false)
                        }}
                    >
                        {(form) => (
                            <Fragment>
                                <FormField
                                    control={form.control}
                                    name="idIncomeStatement"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Poste du compte de résultat"
                                                tooltip="Le poste du compte de résultat à utiliser pour cette opération."
                                                isRequired
                                            />
                                            <FormControl>
                                                <InputDataCombobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    routeDefinition={readAllIncomeStatementsRouteDefinition}
                                                    body={{
                                                        idOrganization: props.computation.idOrganization,
                                                        idYear: props.computation.idYear,
                                                    }}
                                                    placeholder="Sélectionner un poste du compte de résultat"
                                                    getOption={(incomeStatement) => ({
                                                        key: incomeStatement.id,
                                                        label: `${incomeStatement.number} - ${incomeStatement.label}`
                                                    })}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="operation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Opération"
                                                tooltip="L'opération à effectuer avec cette ligne de compte de résultat."
                                                isRequired
                                            />
                                            <FormControl>
                                                <InputToggle
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    options={[
                                                        { label: "Addition", value: "plus" },
                                                        { label: "Soustraction", value: "minus" }
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
