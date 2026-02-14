import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { Outlet, useMatches, useRouterState } from "@tanstack/react-router"
import { ReactNode } from "react"
import { ValidParams, ValidRoutes } from "../../routes/platformRouter.js"
import { LinkButton } from "../linkButton.js"


export function SubPageLayout(props: {
    sections: Record<string, {
        title: string
        icon: ReactNode
        items: Array<{
            label: string
            to: ValidRoutes
            params: ValidParams
        }>
    }> | undefined
}) {
    const routeMatches = useMatches()
    const currentPath = useRouterState({
        select: (state) => state.matches.at(-1)?.routeId
    })

    return (
        <div
            className={css({
                width: "100%",
                flexShrink: "0",
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                overflowY: "auto",
                paddingX: "1rem",
            })}
        >
            <div className={css({
                flex: "1",
                flexShrink: "1",
                width: "100%",
                maxWidth: "xl",
                height: "fit",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
            })}>
                {
                    props.sections === undefined
                        ? (null)
                        : (
                            <aside className={css({
                                minWidth: "16rem",
                                flexShrink: 0,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "stretch",
                                gap: "0.5rem",
                                borderRight: "1px solid",
                                borderRightColor: "neutral/10",
                                backgroundColor: "white",
                                position: "sticky",
                                top: "0",
                                height: "fit-content",
                                maxHeight: "100vh",
                                overflowY: "auto",
                                padding: "1rem",
                                paddingLeft: 0,
                            })}>
                                {Object.entries(props.sections).map(([key, section]) => (
                                    <div key={key} className={css({ marginBottom: "0.5rem" })}>
                                        <div className={css({
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            padding: "0.5rem",
                                            fontSize: "xs",
                                            fontWeight: "semibold",
                                            color: "neutral/40",
                                            textTransform: "uppercase",
                                            letterSpacing: "wider",
                                        })}>
                                            {section.icon}
                                            {section.title}
                                        </div>
                                        <div className={css({
                                            marginTop: "0.25rem",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "0.25rem",
                                        })}>
                                            {section.items.map((item) => {
                                                const normalizedTo = (item.to ?? "").replace(/\/+$/, "")
                                                const matchRoute = [...routeMatches].reverse().find((match) => match.fullPath.replace(/\/+$/, "") === normalizedTo)
                                                const isActive = (matchRoute === undefined)
                                                    ? false
                                                    : currentPath === matchRoute.routeId

                                                return (
                                                    <LinkButton
                                                        key={item.to}
                                                        to={item.to}
                                                        params={item.params}
                                                        className={css({ width: "100%" })}
                                                    >
                                                        <ButtonContent
                                                            variant="invisible"
                                                            text={item.label}
                                                            isActive={isActive}
                                                            className={css({
                                                                width: "100%",
                                                                justifyContent: "start",
                                                            })}
                                                        />
                                                    </LinkButton>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </aside>
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
                })}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
