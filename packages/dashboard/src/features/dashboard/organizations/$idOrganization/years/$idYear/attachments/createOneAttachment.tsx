import { fileSchema } from "@arrhes/application-metadata/components"
import { createOneAttachmentRouteDefinition, generateAttachmentPutSignedUrlRouteDefinition, readAllAttachmentsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
import { JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"
import { invalidateData } from "../../../../../../../utilities/invalidateData.js"
import { postAPI } from "../../../../../../../utilities/postAPI.js"
import { FormControl } from "../../../../../../../components/forms/formControl.js"
import { FormError } from "../../../../../../../components/forms/formError.js"
import { FormField } from "../../../../../../../components/forms/formField.js"
import { FormItem } from "../../../../../../../components/forms/formItem.js"
import { FormLabel } from "../../../../../../../components/forms/formLabel.js"
import { FormRoot } from "../../../../../../../components/forms/formRoot.js"
import { InputDate } from "../../../../../../../components/inputs/inputDate.js"
import { InputFile } from "../../../../../../../components/inputs/inputFile.js"
import { InputText } from "../../../../../../../components/inputs/inputText.js"
import { Drawer } from "../../../../../../../components/overlays/drawer/drawer.js"
import { toast } from "../../../../../../../contexts/toasts/useToast.js"


export function CreateOneAttachment(props: {
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
                        schema={v.intersect([
                            createOneAttachmentRouteDefinition.schemas.body,
                            v.object({ file: v.optional(fileSchema) })
                        ])}
                        defaultValues={{
                            idOrganization: props.idOrganization,
                            idYear: props.idYear,
                        }}
                        submitButtonProps={{
                            icon: <IconPlus />,
                            text: "Ajouter le fichier",
                        }}
                        onSubmit={async (data) => {
                            const createAttachmentResponse = await postAPI({
                                routeDefinition: createOneAttachmentRouteDefinition,
                                body: {
                                    idOrganization: data.idOrganization,
                                    idYear: data.idYear,
                                    reference: data.reference,
                                    label: data.label,
                                    date: data.date,
                                },
                            })
                            if (createAttachmentResponse.ok === false) {
                                toast({ title: "Impossible d'ajouter le fichier", variant: "error" })
                                return false
                            }


                            if (data.file !== undefined) {
                                const signedUrlResponse = await postAPI({
                                    routeDefinition: generateAttachmentPutSignedUrlRouteDefinition,
                                    body: {
                                        idOrganization: props.idOrganization,
                                        idYear: props.idYear,
                                        idAttachment: createAttachmentResponse.data.id,
                                        type: data.file.type,
                                        size: data.file.size,
                                    },
                                })
                                if (signedUrlResponse.ok === false) {
                                    toast({ title: "Impossible de télécharger le fichier", variant: "error" })
                                    return false
                                }
                                const uploadFileResponse = await fetch(
                                    signedUrlResponse.data.url,
                                    {
                                        method: "PUT",
                                        body: data.file,
                                    }
                                )
                                if (uploadFileResponse.ok === false) {
                                    toast({ title: "Le fichier ne peut pas être téléchargé", variant: "error" })
                                    return false
                                }
                            }

                            toast({ title: "Fichier ajouté avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {

                            await invalidateData({
                                routeDefinition: readAllAttachmentsRouteDefinition,
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
                                    name="file"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Fichier"
                                                isRequired
                                            />
                                            <FormControl>
                                                <InputFile
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
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Date"
                                                isRequired={true}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputDate
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
                                    name="reference"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Référence"
                                                // tooltip="La référence associée au fichier."
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
                                    name="label"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Libellé du fichier"
                                                isRequired={false}
                                                description={undefined}
                                                tooltip={undefined}
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
