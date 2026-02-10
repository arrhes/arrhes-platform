import { ButtonContent } from "@arrhes/ui"
import { Outlet, useMatches, useRouterState } from "@tanstack/react-router"
import { JSX } from "react"
import { ValidParams, ValidRoutes } from "../../routes/platformRouter.js"
import { css, cx } from "../../utilities/cn.js"
import { LinkButton } from "../linkButton.js"


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
            gap: "8"
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
                            gap: "3",
                            borderRight: "1px solid",
                            borderColor: "neutral/10",
                            pr: "4"
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
                                            <LinkButton
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
                                            </LinkButton>
                                            <div
                                                className={cx(
                                                    css({
                                                        flexShrink: "0",
                                                        width: "2px",
                                                        borderRadius: "100%"
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
                minWidth: "0",
                width: "100%",
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "stretch",
                paddingY: "2"
            })}>
                <Outlet />
            </div>
        </div>
    )
}
