import { ButtonGhostContent } from "#/components/buttons/buttonGhostContent.js"
import { ValidParams, ValidRoutes } from "#/routes/platformRouter.js"
import { cn } from "#/utilities/cn.js"
import { Link, Outlet, useMatches, useRouterState } from "@tanstack/react-router"
import { JSX } from "react"


export function PageLayout(props: {
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
        <div className="flex-1 shrink-0 w-full min-h-fit flex flex-col justify-start items-start overflow-auto">
            {
                props.tabs === undefined
                    ? null
                    : (
                        <div className="w-full flex justify-start items-center gap-2 px-4">
                            {
                                props.tabs.map((tab) => {
                                    const matchRoute = routeMatches.find((match) => match.fullPath === tab.to)
                                    const isActive = (matchRoute === undefined)
                                        ? false
                                        : currentPath?.includes(matchRoute.routeId)

                                    return (
                                        <div
                                            key={tab.to}
                                            aria-current={isActive}
                                            className="flex flex-col justify-center items-center gap-2 group"
                                        >
                                            <Link
                                                to={tab.to}
                                                params={tab.params}
                                                className="flex justify-center items-center gap-2"
                                            >
                                                <ButtonGhostContent
                                                    icon={tab.icon}
                                                    text={tab.label}
                                                    color="neutral"
                                                    isActive={isActive}
                                                    className="transition-all duration-200 ease-in-out"
                                                />
                                            </Link>
                                            <div
                                                className={cn(
                                                    "shrink-0 w-full h-[2px] rounded-full",
                                                    "transition-all duration-200 ease-in-out",
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
            <div className="flex-1 shrink-0 w-full min-h-fit flex justify-start items-stretch overflow-x-hidden overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}
