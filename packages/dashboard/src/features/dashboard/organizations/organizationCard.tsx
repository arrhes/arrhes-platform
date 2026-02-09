import { getAllMyOrganizationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { IconBuilding, IconChevronRight } from "@tabler/icons-react"
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
        <Link
            to="/organisations/$idOrganization"
            params={{
                idOrganization: organization.id
            }}
            className={cx(
                css({ width: "100%", p: "4", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4" }),
                css({ border: "1px solid", borderColor: "neutral/10", rounded: "md" }),
                css({ _hover: { borderColor: "neutral/20", backgroundColor: "neutral/2" }, transition: "colors", cursor: "pointer" })
            )}
        >
            <div className={css({ display: "flex", alignItems: "center", gap: "4" })}>
                <div className={cx(
                    css({ width: "12", height: "12", display: "flex", alignItems: "center", justifyContent: "center", rounded: "md" }),
                    css({ backgroundColor: "neutral/5" })
                )}>
                    <IconBuilding className={css({ width: "6", height: "6", color: "neutral/50" })} />
                </div>
                <div className={css({ display: "flex", flexDirection: "column", gap: "1" })}>
                    <span className={css({ fontSize: "base", fontWeight: "medium", color: "neutral" })}>
                        {organization.name}
                    </span>
                    <div className={css({ display: "flex", alignItems: "center", gap: "2" })}>
                        <Chip
                            text={scopeLabel}
                            color="neutral"
                        />
                        {organizationUser.isAdmin && (
                            <Chip
                                text="Administrateur"
                                color="information"
                            />
                        )}
                        {organization.siren && (
                            <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                                SIREN: {organization.siren}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className={css({ display: "flex", alignItems: "center", gap: "2" })}>
                {organizationUser.status === "invited" && (
                    <Chip
                        text="En attente"
                        color="warning"
                    />
                )}
                <IconChevronRight className={css({ width: "5", height: "5", color: "neutral/30" })} />
            </div>
        </Link>
    )
}
