import { ButtonContent } from "@arrhes/ui"
import { useMatches, useRouterState } from "@tanstack/react-router"
import { JSX } from "react"
import { ValidParams, ValidRoutes } from "../../../routes/platformRouter.js"
import { css } from "../../../utilities/cn.js"
import { LinkButton } from "../../linkButton.js"


export function PageNavigation(props: {
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
            flexShrink: "0",
            width: "100%",
            minHeight: "fit",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            padding: "1rem",
            borderBottom: "1px solid",
            borderBottomColor: "neutral/10",
        })}>
            {
                props.tabs === undefined
                    ? null
                    : (
                        <div className={css({
                            width: "100%",
                            maxWidth: "xl",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "0.5rem",
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
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "2"
                                            })}
                                        >
                                            <LinkButton
                                                to={tab.to}
                                                params={tab.params}
                                            >
                                                <ButtonContent
                                                    variant="invisible"
                                                    leftIcon={tab.icon}
                                                    text={tab.label}
                                                    color="neutral"
                                                    isActive={isActive}
                                                />
                                            </LinkButton>
                                            {/* <div
                                                className={cx(
                                                    css({
                                                        flexShrink: "0",
                                                        width: "100%",
                                                        height: "2px",
                                                        borderRadius: "100%",
                                                        transition: "all",
                                                        transitionDuration: "200ms",
                                                        transitionTimingFunction: "ease-in-out"
                                                    }),
                                                    isActive ? css({ backgroundColor: "neutral" }) : css({ backgroundColor: "transparent" })
                                                )}
                                            /> */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
            }
        </div>
    )
}
