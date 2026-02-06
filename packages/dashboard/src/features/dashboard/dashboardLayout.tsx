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
        <div className={css({ position: "relative", minH: "full", h: "fit-content", w: "full", maxW: "full", display: "flex", flexDir: "column", justifyContent: "flex-start", alignItems: "stretch", overflow: "auto" })}>
            <div className={css({ w: "full", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2", p: "4" })}>
                <div className={css({ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "2" })}>
                    <Link
                        to="/"
                    >
                        <ButtonContent
                            variant="invisible"
                            icon={<IconAbacus />}
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
                        to="/docs"
                        className={css({ w: "fit-content" })}
                        aria-label="Documentation"
                    >
                        <ButtonContent
                            variant="default"
                            icon={<IconBook2 />}
                            text="Documentation"
                        />
                    </Link>
                    <Dropdown.Root>
                        <Dropdown.Trigger
                            className={css({ w: "full" })}
                        >
                            <ButtonContent
                                variant="default"
                                icon={<IconUser />}
                                className={css({ w: "full" })}
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
                                                className={css({ w: "full" })}
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
                                                className={css({ w: "full" })}
                                            />
                                        </Menubar.Item>
                                    </Link> */}
                            {/* <Dropdown.Item>
                                <Link
                                    to="/paramètres"
                                    className={css({ w: "full" })}
                                >
                                    <ButtonGhostContent
                                        icon={<IconSettings />}
                                        text="Paramètres"
                                        className={css({ w: "full" })}
                                    />
                                </Link>
                            </Dropdown.Item> */}
                            {/* <Dropdown.Item>
                                <Link
                                    to="/organisations"
                                    className={css({ w: "full" })}
                                >
                                    <ButtonGhostContent
                                        icon={<IconBuilding />}
                                        text="Organisations"
                                        className={css({ w: "full" })}
                                    />
                                </Link>
                            </Dropdown.Item> */}
                            <Dropdown.Item>
                                <Link
                                    to="/dashboard/support"
                                    className={css({ w: "full" })}
                                >
                                    <ButtonContent
                                        variant="invisible"
                                        icon={<IconLifebuoy />}
                                        text="Support"
                                        className={css({ w: "full" })}
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
                                    className={css({ w: "full" })}
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
