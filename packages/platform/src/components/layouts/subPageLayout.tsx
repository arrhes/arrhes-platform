import { ButtonGhostContent } from "#/components/buttons/buttonGhostContent.js"
import { ValidParams, ValidRoutes } from "#/routes/platformRouter.js"
import { cn } from "#/utilities/cn.js"
import { Link, Outlet, useMatches, useRouterState } from "@tanstack/react-router"
import { JSX } from "react"


export function SubPageLayout(props: {
    tabs: Array<{
        label: string
        icon: JSX.Element
        to: ValidRoutes
        params: ValidParams
    }> | undefined
}) {
    const routeMatches = useMatches()
    const currentPath = useRouterState({
        select: (state) => state.matches.at(-1)?.routeId
    })

    return (
        <div className="flex-1 shrink w-full max-w-full h-fit flex justify-start items-start gap-4">
            {
                props.tabs === undefined
                    ? (null)
                    : (
                        <div className="w-fit flex flex-col justify-start items-stretch gap-2 border-r border-neutral/10">
                            {
                                props.tabs.map((tab) => {
                                    const matchRoute = routeMatches.find((match) => match.fullPath.includes(tab.to ?? ""))
                                    const isActive = (matchRoute === undefined)
                                        ? false
                                        : currentPath === matchRoute.routeId

                                    return (
                                        <div
                                            key={tab.to}
                                            aria-current={isActive}
                                            className="w-full flex justify-start items-stretch gap-2 group"
                                        >
                                            <Link
                                                to={tab.to}
                                                params={tab.params}
                                                className="w-full flex justify-start items-center gap-2"
                                            >
                                                <ButtonGhostContent
                                                    icon={tab.icon}
                                                    text={tab.label}
                                                    color="neutral"
                                                    isActive={isActive}
                                                    className="w-full transition-all duration-200 ease-in-out"
                                                />
                                            </Link>
                                            <div
                                                className={cn(
                                                    "shrink-0 w-[2px] rounded-full",
                                                    isActive ? "bg-neutral" : "bg-transparent"
                                                )}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
            }
            <div className="shrink min-h-fit min-w-0 w-full max-w-full flex flex-col justify-start items-stretch">
                <Outlet />
            </div>
        </div>
    )
}
