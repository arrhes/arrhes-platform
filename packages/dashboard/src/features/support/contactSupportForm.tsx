import { FormControl } from "#/components/forms/formControl.js"
import { FormError } from "#/components/forms/formError.js"
import { FormField } from "#/components/forms/formField.js"
import { FormItem } from "#/components/forms/formItem.js"
import { FormLabel } from "#/components/forms/formLabel.js"
import { FormRoot } from "#/components/forms/formRoot.js"
import { InputTextArea } from "#/components/inputs/inputTextArea.js"
import { InputToggle } from "#/components/inputs/inputToggle.js"
import { toast } from "#/contexts/toasts/useToast.js"
import { platformRouter } from "#/routes/platformRouter.js"
import { postAPI } from "#/utilities/postAPI.js"
import { sendSupportMessageRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconSend } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime"


export function ContactSupportForm() {
    return (
        <FormRoot
            schema={sendSupportMessageRouteDefinition.schemas.body}
            defaultValues={{
                category: "bug",
            }}
            submitButtonProps={{
                icon: <IconSend />,
                text: "Envoyer le message",
            }}
            onSubmit={async (data) => {
                const response = await postAPI({
                    routeDefinition: sendSupportMessageRouteDefinition,
                    body: data,
                })
                if (!response.ok) {
                    toast({ title: "Le support n'a pas pu être contacté", variant: "error" })
                    return false
                }

                toast({ title: "Support contacté, nous reviendrons vers vous au plus vite", variant: "success" })
                return true
            }}
            onCancel={undefined}
            onSuccess={() => {
                platformRouter.navigate({
                    to: "/",
                    reloadDocument: true
                })
            }}
        >
            {(form) => (
                <Fragment>
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Type d'organisation"
                                    isRequired={true}
                                    description={undefined}
                                    tooltip={undefined}
                                />
                                <FormControl>
                                    <InputToggle
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={[
                                            { value: "bug", label: "Remonter une erreur" },
                                            { value: "enhancement", label: "Suggestion d'amélioration" },
                                            { value: "feature", label: "Demande de fonctionnalité" },
                                            { value: "other", label: "Autre" },

                                        ]}
                                    />
                                </FormControl>
                                <FormError />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Message"
                                    isRequired={true}
                                    description={undefined}
                                    tooltip={undefined}
                                />
                                <FormControl>
                                    <InputTextArea
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
    )
}