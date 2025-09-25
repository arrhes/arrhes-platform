import { ButtonGhostContent } from "#/components/buttons/buttonGhostContent.js"
import { IconSlash } from "@tabler/icons-react"
import { Link, useRouterState } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"


export function Breadcrumbs() {
    const routerState = useRouterState()
    const currentMatch = routerState.matches.at(-1)
    const params = currentMatch?.params ?? {}

    const idOrganization = ("idOrganization" in params)
        ? String(params.idOrganization)
        : null

    const idYear = ("idYear" in params)
        ? String(params.idYear)
        : null

    if (idOrganization === null) {
        return (null)
    }
    return (
        <div className="flex justify-start items-center gap-1">
            {
                (idOrganization === null)
                    ? (null)
                    : (
                        <Link
                            to="/organisations/$idOrganization"
                            params={{
                                idOrganization: idOrganization,
                            }}
                        >
                            <ButtonGhostContent
                                text={idOrganization}
                                isActive={(idYear === null)}
                            />
                        </Link>
                    )
            }
            {
                (idYear === null)
                    ? (null)
                    : (
                        <Fragment>
                            <IconSlash
                                size={16}
                                className="stroke-neutral/25"
                            />
                            <Link
                                to="/organisations/$idOrganization/exercices/$idYear/écritures"
                                params={{
                                    idOrganization: idOrganization,
                                    idYear: idYear,
                                }}
                            >
                                <ButtonGhostContent
                                    text={idYear}
                                    isActive={true}
                                />
                            </Link>
                        </Fragment>
                    )
            }
        </div>
    )
}
