import { ButtonGhost } from "#/components/buttons/buttonGhost.js"
import { ButtonGhostContent } from "#/components/buttons/buttonGhostContent.js"
import { ButtonOutlineContent } from "#/components/buttons/buttonOutlineContent.js"
import { Dropdown } from "#/components/layouts/dropdownMenu/dropdown.js"
import { toast } from "#/contexts/toasts/useToast.js"
import { Breadcrumbs } from "#/features/breadcrumbs.js"
import { platformRouter } from "#/routes/platformRouter.js"
import { postAPI } from "#/utilities/postAPI.js"
import { signOutRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconAbacus, IconBuilding, IconLifebuoy, IconLogout, IconSettings, IconUser } from "@tabler/icons-react"
import { Link, Outlet } from "@tanstack/react-router"


export function AuthLayout() {
    return (
        <div className="relative min-h-full h-fit w-full max-w-full flex flex-col justify-start items-stretch overflow-auto">
            <div className="w-full flex justify-between items-center gap-2 p-4">
                <div className="flex justify-start items-center gap-4">
                    <Link
                        to="/"
                    >
                        <ButtonGhostContent
                            icon={<IconAbacus />}
                        />
                    </Link>
                    <Breadcrumbs />
                </div>
                <div>
                    <Dropdown.Root>
                        <Dropdown.Trigger
                            className="w-full"
                        >
                            <ButtonOutlineContent
                                icon={<IconUser />}
                                className="w-full"
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
                                                className="w-full"
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
                                                className="w-full"
                                            />
                                        </Menubar.Item>
                                    </Link> */}
                            <Dropdown.Item>
                                <Link
                                    to="/paramètres"
                                    className="w-full"
                                >
                                    <ButtonGhostContent
                                        icon={<IconSettings />}
                                        text="Paramètres"
                                        className="w-full"
                                    />
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link
                                    to="/organisations"
                                    className="w-full"
                                >
                                    <ButtonGhostContent
                                        icon={<IconBuilding />}
                                        text="Organisations"
                                        className="w-full"
                                    />
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link
                                    to="/support"
                                    className="w-full"
                                >
                                    <ButtonGhostContent
                                        icon={<IconLifebuoy />}
                                        text="Support"
                                        className="w-full"
                                    />
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Separator />
                            <Dropdown.Item asChild>
                                <ButtonGhost
                                    icon={<IconLogout />}
                                    text="Se déconnecter"
                                    color="error"
                                    className="w-full"
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
