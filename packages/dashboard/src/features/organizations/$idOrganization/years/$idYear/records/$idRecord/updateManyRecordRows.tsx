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
import { invalidateData } from "#/utilities/invalidateData.js"
import { postAPI } from "#/utilities/postAPI.js"
import { readAllRecordRowsRouteDefinition, updateManyRecordRowsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPencil } from "@tabler/icons-react"
import { JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"


export function UpdateManyRecordRows(props: {
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
                    title="Modifier tous les mouvements"
                />
                <Drawer.Body>
                    <FormRoot
                        schema={updateManyRecordRowsRouteDefinition.schemas.body}
                        defaultValues={{
                            idOrganization: props.record.idOrganization,
                            idYear: props.record.idYear,
                            idRecord: props.record.id,
                        }}
                        submitButtonProps={{
                            icon: <IconPencil />,
                            text: "Modifier les mouvements",
                        }}
                        onSubmit={async (data) => {
                            const updateManyRecordRowsResponse = await postAPI({
                                routeDefinition: updateManyRecordRowsRouteDefinition,
                                body: data,
                            })
                            if (updateManyRecordRowsResponse.ok === false) {
                                toast({ title: "Impossible de modifier les mouvements", variant: "error" })
                                return false
                            }

                            toast({ title: "Mouvements modifiés avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {

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
                                <div className="w-full flex-col justify-start items-start gap-2">
                                    <FormLabel
                                        label="Mouvement ajouté aux calculs ?"
                                        isRequired={false}
                                    />
                                    <div className="w-full flex justify-start items-start flex-wrap gap-2">
                                        <FormField
                                            control={form.control}
                                            name="isComputedForJournalReport"
                                            render={({ field }) => (
                                                <FormItem className="w-fit">
                                                    <FormLabel
                                                        label="Journal"
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
                                        <FormField
                                            control={form.control}
                                            name="isComputedForLedgerReport"
                                            render={({ field }) => (
                                                <FormItem className="w-fit">
                                                    <FormLabel
                                                        label="Grand-livre"
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
                                        <FormField
                                            control={form.control}
                                            name="isComputedForBalanceReport"
                                            render={({ field }) => (
                                                <FormItem className="w-fit">
                                                    <FormLabel
                                                        label="Balance"
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
                                        <FormField
                                            control={form.control}
                                            name="isComputedForBalanceSheetReport"
                                            render={({ field }) => (
                                                <FormItem className="w-fit">
                                                    <FormLabel
                                                        label="Bilan"
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
                                        <FormField
                                            control={form.control}
                                            name="isComputedForIncomeStatementReport"
                                            render={({ field }) => (
                                                <FormItem className="w-fit">
                                                    <FormLabel
                                                        label="Compte de résultat"
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
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </FormRoot>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
