import { signOutRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonContent, Logo, Separator } from "@arrhes/ui"
import { IconBook2, IconBuildings, IconLifebuoy, IconLogout, IconUser } from "@tabler/icons-react"
import { Outlet } from "@tanstack/react-router"
import { LinkButton } from "../../components/linkButton.js"
import { Popover } from "../../components/overlays/popover/popover.js"
import { toast } from "../../contexts/toasts/useToast.js"
import { platformRouter } from "../../routes/platformRouter.js"
import { css } from "../../utilities/cn.js"
import { postAPI } from "../../utilities/postAPI.js"
import { Breadcrumbs } from "../breadcrumbs.js"


export function DashboardLayout() {
    return (
        <div className={css({
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "stretch",
            backgroundColor: "background"
        })}>
            {/* Header */}
            <header className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                padding: "1rem",
                borderBottom: "1px solid",
                borderColor: "neutral/8",
                backgroundColor: "white",
            })}>
                <div className={css({
                    width: "100%",
                    maxWidth: "xl",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                })}>
                    <div className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}>
                        <LinkButton to="/dashboard">
                            <Logo />
                        </LinkButton>
                        <Breadcrumbs />
                    </div>
                    <nav className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}>
                        <LinkButton
                            to="/documentation"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Documentation"
                        >
                            <ButtonContent
                                variant="invisible"
                                leftIcon={<IconBook2 />}
                            />
                        </LinkButton>
                        <LinkButton
                            to="/dashboard/organisations"
                            title="Organisations"
                        >
                            <ButtonContent
                                variant="default"
                                leftIcon={<IconBuildings />}
                            />
                        </LinkButton>
                        <Popover.Root>
                            <Popover.Trigger asChild>
                                <Button
                                    title="Utilisateur"
                                >
                                    <ButtonContent
                                        variant="default"
                                        leftIcon={<IconUser />}
                                    />
                                </Button>
                            </Popover.Trigger>
                            <Popover.Content align="end">
                                <LinkButton
                                    to="/dashboard/support"
                                    className={css({ width: "100%" })}
                                >
                                    <ButtonContent
                                        variant="invisible"
                                        leftIcon={<IconLifebuoy />}
                                        text="Support"
                                        className={css({ width: "100%", justifyContent: "start" })}
                                    />
                                </LinkButton>
                                <Separator />
                                <Button
                                    className={css({ width: "100%" })}
                                    onClick={async () => {
                                        await postAPI({
                                            routeDefinition: signOutRouteDefinition,
                                            body: {},
                                        })
                                        toast({ title: "Déconnexion réussie", variant: "success" })

                                        platformRouter.navigate({
                                            to: "/connexion",
                                            reloadDocument: true,
                                        })
                                    }}
                                >
                                    <ButtonContent
                                        variant="invisible"
                                        leftIcon={<IconLogout />}
                                        text="Se déconnecter"
                                        color="error"
                                        className={css({ width: "100%", justifyContent: "start" })}
                                    />
                                </Button>
                            </Popover.Content>
                        </Popover.Root>
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <div className={css({
                width: "100%",
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                backgroundColor: "white",
            })}>
                <div className={css({
                    width: "100%",
                    // maxWidth: "xl",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                })}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
