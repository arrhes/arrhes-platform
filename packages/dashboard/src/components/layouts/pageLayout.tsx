import { ButtonContent } from "@arrhes/ui"
import { ValidParams, ValidRoutes } from "../../routes/platformRouter.js"
import { css, cx } from "../../utilities/cn.js"
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
    }) as unknown as string | undefined

    return (
        <div className={css({
            flex: "1",
            flexShrink: "0",
            w: "full",
            minH: "fit",
            display: "flex",
            flexDir: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            overflow: "auto"
        })}>
            {
                props.tabs === undefined
                    ? null
                    : (
                        <div className={css({
                            w: "full",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "2",
                            px: "4"
                        })}>
                            {
                                props.tabs.map((tab) => {
                                    const matchRoute = routeMatches.find((match) => match.fullPath === tab.to)
                                    const isActive = (matchRoute === undefined || !currentPath)
                                        ? false
                                        : currentPath.includes(matchRoute.routeId)

                                    return (
                                        <div
                                            key={tab.to}
                                            aria-current={isActive}
                                            className={css({
                                                display: "flex",
                                                flexDir: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "2"
                                            })}
                                        >
                                            <Link
                                                to={tab.to}
                                                params={tab.params}
                                                className={css({
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    gap: "2"
                                                })}
                                            >
                                                <ButtonContent
                                                    variant="invisible"
                                                    icon={tab.icon}
                                                    text={tab.label}
                                                    color="neutral"
                                                    isActive={isActive}
                                                    className={css({
                                                        transition: "all",
                                                        transitionDuration: "200ms",
                                                        transitionTimingFunction: "ease-in-out"
                                                    })}
                                                />
                                            </Link>
                                            <div
                                                className={cx(
                                                    css({
                                                        flexShrink: "0",
                                                        w: "full",
                                                        h: "2px",
                                                        rounded: "full",
                                                        transition: "all",
                                                        transitionDuration: "200ms",
                                                        transitionTimingFunction: "ease-in-out"
                                                    }),
                                                    isActive ? css({ bg: "neutral" }) : css({ bg: "transparent" })
                                                )}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
            }
            <div className={css({
                flex: "1",
                flexShrink: "0",
                w: "full",
                minH: "fit",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "stretch",
                overflowX: "hidden",
                overflowY: "auto"
            })}>
                <Outlet />
            </div>
        </div>
    )
}
