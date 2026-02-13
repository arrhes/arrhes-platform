import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useMatches, useRouterState } from "@tanstack/react-router"
import { JSX } from "react"
import { ValidParams, ValidRoutes } from "../../../routes/platformRouter.js"
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
            paddingX: "1rem",
            paddingY: "0.5rem",
            borderBottom: "1px solid",
            borderBottomColor: "neutral/5",
            backgroundColor: "background",
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
                                        <LinkButton
                                            key={tab.to}
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
                                    )
                                })
                            }
                        </div>
                    )
            }
        </div>
    )
}
