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
import { signInRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconLogin2 } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"


export function SignInPage() {
    return (
        <div className={css({
            w: "full",
            h: "full",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        })}>
            <div className={css({
                w: "full",
                maxW: "sm",
                display: "flex",
                flexDir: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "4"
            })}>
                <div className={css({
                    w: "full",
                    display: "flex",
                    flexDir: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "4",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    rounded: "md",
                    p: "8"
                })}>
                    <span className={css({ fontSize: "xl" })}>
                        Connexion
                    </span>
                    <div className={css({
                        w: "full",
                        display: "flex",
                        flexDir: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "4"
                    })}>
                        <FormRoot
                            schema={signInRouteDefinition.schemas.body}
                            defaultValues={{}}
                            submitButtonProps={{
                                icon: <IconLogin2 />,
                                text: "Se connecter",
                                className: css({ w: "full", justifyContent: "center" })
                            }}
                            submitOnPressEnterKey={true}
                            onSubmit={async (data) => {
                                const response = await postAPI({
                                    routeDefinition: signInRouteDefinition,
                                    body: data,
                                })
                                if (response.ok === false) {
                                    toast({ title: "Connexion impossible", variant: "error" })
                                    return false
                                }

                                toast({ title: "Connexion réussie", variant: "success" })
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
                                </Fragment>
                            )}
                        </FormRoot>
                        <Link
                            to="/inscription"
                            className={css({ w: "full" })}
                        >
                            <ButtonContent
                                variant="default"
                                text="Pas de compte ?"
                                className={css({ w: "full", justifyContent: "center" })}
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