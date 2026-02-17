import { fileSchema } from "@arrhes/application-metadata/components"
import {
    generateFilePutSignedUrlRouteDefinition,
    readAllFilesRouteDefinition,
    readOneFileRouteDefinition,
    updateOneFileRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"
import { FormControl } from "../../../../../../../../components/forms/formControl.tsx"
import { FormError } from "../../../../../../../../components/forms/formError.tsx"
import { FormField } from "../../../../../../../../components/forms/formField.tsx"
import { FormItem } from "../../../../../../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../../../../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../../../../../../components/forms/formRoot.tsx"
import { InputFile } from "../../../../../../../../components/inputs/inputFile.tsx"
import { InputText } from "../../../../../../../../components/inputs/inputText.tsx"
import { Drawer } from "../../../../../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../../../utilities/invalidateData.ts"

export function UpdateOneFile(props: { file: v.InferOutput<typeof returnedSchemas.file>; children: JSX.Element }) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier le fichier" />
                <Drawer.Body>
                    <FormRoot
                        schema={v.intersect([
                            updateOneFileRouteDefinition.schemas.body,
                            v.object({ file: v.optional(fileSchema) }),
                        ])}
                        defaultValues={{
                            ...props.file,
                            idFile: props.file.id,
                        }}
                        submitButtonProps={{
                            leftIcon: <IconPlus />,
                            text: "Modifier le fichier",
                        }}
                        onSubmit={async (data) => {
                            const updateFileResponse = await getResponseBodyFromAPI({
                                routeDefinition: updateOneFileRouteDefinition,
                                body: {
                                    idFile: props.file.id,
                                    idOrganization: data.idOrganization,
                                    idYear: data.idYear,
                                    reference: data.reference,
                                    name: data.name,
                                },
                            })
                            if (updateFileResponse.ok === false) {
                                toast({ title: "Impossible de modifier le fichier", variant: "error" })
                                return false
                            }

                            if (data.file !== undefined) {
                                const signedUrlResponse = await getResponseBodyFromAPI({
                                    routeDefinition: generateFilePutSignedUrlRouteDefinition,
                                    body: {
                                        idOrganization: props.file.idOrganization,
                                        idYear: props.file.idYear,
                                        idFile: updateFileResponse.data.id,
                                        type: data.file.type,
                                        size: data.file.size,
                                    },
                                })
                                if (signedUrlResponse.ok === false) {
                                    toast({ title: "Impossible de télécharger le fichier", variant: "error" })
                                    return false
                                }
                                const uploadFileResponse = await fetch(signedUrlResponse.data.url, {
                                    method: "PUT",
                                    body: data.file,
                                })
                                if (uploadFileResponse.ok === false) {
                                    toast({ title: "Le fichier ne peut pas être téléchargé", variant: "error" })
                                    return false
                                }
                            }

                            toast({ title: "Fichier modifié avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            await invalidateData({
                                routeDefinition: readAllFilesRouteDefinition,
                                body: {
                                    idOrganization: props.file.idOrganization,
                                    idYear: props.file.idYear,
                                },
                            })

                            await invalidateData({
                                routeDefinition: readOneFileRouteDefinition,
                                body: {
                                    idFile: props.file.id,
                                    idOrganization: props.file.idOrganization,
                                    idYear: props.file.idYear,
                                },
                            })

                            setOpen(false)
                        }}
                    >
                        {(form) => (
                            <Fragment>
                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel label="Fichier" isRequired />
                                            <FormControl>
                                                <InputFile value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="reference"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Référence"
                                                // tooltip="La référence associée au fichier."
                                                isRequired
                                            />
                                            <FormControl>
                                                <InputText value={field.value} onChange={field.onChange} autoFocus />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Nom du fichier"
                                                isRequired={false}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputText value={field.value} onChange={field.onChange} />
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
