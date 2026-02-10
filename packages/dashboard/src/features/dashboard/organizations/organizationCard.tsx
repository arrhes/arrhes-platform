import { getAllMyOrganizationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { Link } from "@tanstack/react-router"
import * as v from "valibot"
import { Chip } from "../../../components/layouts/chip.tsx"


type OrganizationUser = v.InferOutput<typeof getAllMyOrganizationsRouteDefinition.schemas.return>[number]

export function OrganizationCard(props: {
    organizationUser: OrganizationUser
}) {
    const { organizationUser } = props
    const organization = organizationUser.organization

    const scopeLabel = organization.scope === "company" ? "Entreprise" : "Association"

    return (
        <div className={cx(
            css({ width: "100%", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4" }),
            css({ borderBottom: "1px solid", borderBottomColor: "neutral/10", _last: { borderBottom: "none", } }),
        )}>
            <div className={css({ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "start",
                        gap: "1rem"
                    })}
                >
                    <Link
                        to="/dashboard/organisations/$idOrganization"
                        params={{
                            idOrganization: organization.id
                        }}
                        className={css({
                            fontSize: "base",
                            fontWeight: "semibold",
                            color: "primary",
                            _hover: { textDecoration: "underline" },
                        })}
                    >
                        {organization.name}
                    </Link>
                    <div
                        className={css({
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "start",
                            gap: "0.5rem"
                        })}
                    >
                        {organizationUser.isAdmin && (
                            <Chip
                                text="Administrateur"
                                color="success"
                            />
                        )}
                        {organizationUser.status === "invited" && (
                            <Chip
                                text="En attente"
                                color="warning"
                            />
                        )}
                    </div>
                </div>
                <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" })}>
                    <Chip
                        text={scopeLabel}
                        color="neutral"
                    />
                    {organization.siren && (
                        <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                            SIREN: {organization.siren}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
