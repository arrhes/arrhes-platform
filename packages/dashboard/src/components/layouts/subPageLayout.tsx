import { ButtonContent } from "@arrhes/ui"
import { Link, Outlet, useMatches, useRouterState } from "@tanstack/react-router"
import { JSX } from "react"
import { ValidParams, ValidRoutes } from "../../routes/platformRouter.js"
import { css, cx } from "../../utilities/cn.js"


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
        <div className={css({
            flex: "1",
            flexShrink: "1",
            width: "100%",
            maxWidth: "100%",
            height: "fit",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "4"
        })}>
            {
                props.tabs === undefined
                    ? (null)
                    : (
                        <div className={css({
                            width: "fit",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "stretch",
                            gap: "2",
                            borderRight: "1px solid",
                            borderColor: "neutral/10"
                        })}>
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
                                            className={css({
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "stretch",
                                                gap: "2"
                                            })}
                                        >
                                            <Link
                                                to={tab.to}
                                                params={tab.params}
                                                className={css({
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                    gap: "2"
                                                })}
                                            >
                                                <ButtonContent
                                                    variant="invisible"
                                                    leftIcon={tab.icon}
                                                    text={tab.label}
                                                    color="neutral"
                                                    isActive={isActive}
                                                    className={css({
                                                        width: "100%",
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
                                                        width: "2px",
                                                        rounded: "100%"
                                                    }),
                                                    isActive ? css({ backgroundColor: "neutral" }) : css({ backgroundColor: "transparent" })
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
                flexShrink: "1",
                minH: "fit",
                minwidth: "0",
                width: "100%",
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "stretch"
            })}>
                <Outlet />
            </div>
        </div>
    )
}
