import { ButtonContent } from "@arrhes/ui"
import { FormControl } from "../../components/forms/formControl.js"
import { FormError } from "../../components/forms/formError.js"
import { FormField } from "../../components/forms/formField.js"
import { FormItem } from "../../components/forms/formItem.js"
import { FormLabel } from "../../components/forms/formLabel.js"
import { FormRoot } from "../../components/forms/formRoot.js"
import { InputPassword } from "../../components/inputs/inputPassword.js"
import { InputText } from "../../components/inputs/inputText.js"
import { toast } from "../../contexts/toasts/useToast.js"
import { platformRouter } from "../../routes/platformRouter.js"
import { css } from "../../utilities/cn.js"
import { postAPI } from "../../utilities/postAPI.js"
import { signUpRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconUserPlus } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"


export function SignUpPage() {
    return (
        <div className={css({ w: "full", h: "full", display: "flex", justifyContent: "center", alignItems: "center" })}>
            <div className={css({ w: "full", maxW: "sm", display: "flex", flexDir: "column", justifyContent: "center", alignItems: "center", gap: "4" })}>
                <div className={css({ w: "full", display: "flex", flexDir: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "4", bg: "white", border: "1px solid", borderColor: "neutral/10", rounded: "md", p: "8" })}>
                    <span className={css({ fontSize: "xl" })}>
                        Inscription
                    </span>
                    <div className={css({ w: "full", display: "flex", flexDir: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "4" })}>
                        <FormRoot
                            schema={signUpRouteDefinition.schemas.body}
                            defaultValues={{}}
                            submitButtonProps={{
                                icon: <IconUserPlus />,
                                text: "Inscription",
                                className: css({ w: "full", justifyContent: "center" })
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
                            className={css({ w: "full" })}
                        >
                            <ButtonContent
                                variant="default"
                                text="Déjà inscrit ?"
                                className={css({ w: "full", justifyContent: "center" })}
                            />
                        </Link>
                    </div>
                </div>
            </div>
            {/* <Link
                        to="/connexion/identifiants"
                        className={css({ textDecoration: "underline", _hover: { textDecoration: "none" }, color: "neutral/50" })}
                    >
                        Mot de passe oublié ?
                    </Link> */}
        </div>
    )
}