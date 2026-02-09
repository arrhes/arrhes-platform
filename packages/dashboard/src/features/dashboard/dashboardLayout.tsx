import { signOutRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonContent } from "@arrhes/ui"
import { IconAbacus, IconBook2, IconLifebuoy, IconLogout, IconUser } from "@tabler/icons-react"
import { Link, Outlet } from "@tanstack/react-router"
import { Dropdown } from "../../components/layouts/dropdownMenu/dropdown.js"
import { toast } from "../../contexts/toasts/useToast.js"
import { platformRouter } from "../../routes/platformRouter.js"
import { css } from "../../utilities/cn.js"
import { postAPI } from "../../utilities/postAPI.js"
import { Breadcrumbs } from "../breadcrumbs.js"


export function DashboardLayout() {
    return (
        <div className={css({ position: "relative", minH: "100%", height: "fit-content", width: "100%", maxWidth: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "stretch", overflowidth: "auto" })}>
            <div className={css({ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2", p: "4" })}>
                <div className={css({ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "2" })}>
                    <Link
                        to="/"
                    >
                        <ButtonContent
                            variant="invisible"
                            leftIcon={<IconAbacus />}
                        />
                    </Link>
                    {/* <span>
                        Arrhes
                    </span> */}
                    <Breadcrumbs />
                </div>
                <div
                    className={css({ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2" })}
                >
                    <Link
                        to="/documentation"
                        className={css({ width: "fit-content" })}
                        aria-label="Documentation"
                    >
                        <ButtonContent
                            variant="default"
                            leftIcon={<IconBook2 />}
                            text="Documentation"
                        />
                    </Link>
                    <Dropdown.Root>
                        <Dropdown.Trigger
                            className={css({ width: "100%" })}
                        >
                            <ButtonContent
                                variant="default"
                                leftIcon={<IconUser />}
                                className={css({ width: "100%" })}
                            />
                        </Dropdown.Trigger>
                        <Dropdown.Content
                            align="end"
                        >
                            {/* <Link
                                        to="/dashboard/settings"
                                    >
                                        <Menubar.Item>
                                            <ButtonGhostContent
                                                icon={<IconSettings />}
                                                text="Settings"
                                                className={css({ width: "100%" })}
                                            />
                                        </Menubar.Item>
                                    </Link> */}
                            {/* <Link
                                        to="/dashboard/subscription"
                                    >
                                        <Menubar.Item>
                                            <ButtonGhostContent
                                                icon={<IconRosetteDiscountCheck />}
                                                text="Subscription"
                                                className={css({ width: "100%" })}
                                            />
                                        </Menubar.Item>
                                    </Link> */}
                            {/* <Dropdown.Item>
                                <Link
                                    to="/paramètres"
                                    className={css({ width: "100%" })}
                                >
                                    <ButtonGhostContent
                                        icon={<IconSettings />}
                                        text="Paramètres"
                                        className={css({ width: "100%" })}
                                    />
                                </Link>
                            </Dropdown.Item> */}
                            {/* <Dropdown.Item>
                                <Link
                                    to="/organisations"
                                    className={css({ width: "100%" })}
                                >
                                    <ButtonGhostContent
                                        icon={<IconBuilding />}
                                        text="Organisations"
                                        className={css({ width: "100%" })}
                                    />
                                </Link>
                            </Dropdown.Item> */}
                            <Dropdown.Item>
                                <Link
                                    to="/dashboard/support"
                                    className={css({ width: "100%" })}
                                >
                                    <ButtonContent
                                        variant="invisible"
                                        leftIcon={<IconLifebuoy />}
                                        text="Support"
                                        className={css({ width: "100%" })}
                                    />
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Separator />
                            <Dropdown.Item asChild>
                                <Button
                                    variant="invisible"
                                    icon={<IconLogout />}
                                    text="Se déconnecter"
                                    color="error"
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
                                />
                            </Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
