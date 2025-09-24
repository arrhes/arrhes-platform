import { signUpRouteDefinition } from "@arrhes/schemas/routes"
import { IconUserPlus } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { ButtonOutlineContent } from "components/buttons/buttonOutlineContent"
import { FormControl } from "components/forms/formControl"
import { FormError } from "components/forms/formError"
import { FormField } from "components/forms/formField"
import { FormItem } from "components/forms/formItem"
import { FormLabel } from "components/forms/formLabel"
import { FormRoot } from "components/forms/formRoot"
import { InputPassword } from "components/inputs/inputPassword"
import { InputText } from "components/inputs/inputText"
import { toast } from "contexts/toasts/useToast"
import { Fragment } from "react/jsx-runtime"
import { platformRouter } from "routes/platformRouter"
import { postAPI } from "utilities/postAPI"


export function SignUpPage() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-full max-w-sm flex flex-col justify-center items-center gap-4">
                <div className="w-full flex flex-col justify-start items-start gap-4 bg-white border border-neutral/10 rounded-md p-8">
                    <span className="text-xl">
                        Inscription
                    </span>
                    <div className="w-full flex flex-col justify-start items-start gap-4">
                        <FormRoot
                            schema={signUpRouteDefinition.schemas.body}
                            defaultValues={{}}
                            submitButtonProps={{
                                icon: <IconUserPlus />,
                                text: "Inscription",
                                className: "w-full justify-center"
                            }}
                            submitOnPressEnterKey={true}
                            onSubmit={async (data) => {
                                if (data.password !== data.passwordCheck) {
                                    toast({ title: "Les mots de passe ne correspondent pas", variant: "error" })
                                    return false
                                }

                                const response = await postAPI({
                                    routeDefinition: signUpRouteDefinition,
                                    body: data,
                                })
                                if (!response.ok) {
                                    toast({ title: "Inscription impossible", variant: "error" })
                                    return false
                                }

                                toast({ title: "Inscription réussie", variant: "success" })
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
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Email"
                                                    isRequired={false}
                                                    description={undefined}
                                                    tooltip={undefined}
                                                />
                                                <FormControl>
                                                    <InputText
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        type="email"
                                                    />
                                                </FormControl>
                                                <FormError />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Mot de passe"
                                                    isRequired={false}
                                                    description={undefined}
                                                    tooltip={undefined}
                                                />
                                                <FormControl>
                                                    <InputPassword
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
                                        name="passwordCheck"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Mot de passe (encore)"
                                                    isRequired={false}
                                                    description={undefined}
                                                    tooltip={undefined}
                                                />
                                                <FormControl>
                                                    <InputPassword
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
                        <Link
                            to="/connexion"
                            className="w-full"
                        >
                            <ButtonOutlineContent
                                text="Déjà inscrit ?"
                                className="w-full justify-center"
                            />
                        </Link>
                    </div>
                </div>
            </div>
            {/* <Link
                        to="/connexion/identifiants"
                        className="underline hover:no-underline text-neutral/50"
                    >
                        Mot de passe oublié ?
                    </Link> */}
        </div>
    )
}