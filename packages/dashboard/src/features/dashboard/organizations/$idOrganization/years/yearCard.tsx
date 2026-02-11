import { readAllYearsRouteDefinition } from "@arrhes/application-metadata/routes"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { IconCalendar, IconLock } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import * as v from "valibot"
import { formatDate } from "../../../../../components/formats/formatDate.tsx"
import { Chip } from "../../../../../components/layouts/chip.tsx"


type Year = v.InferOutput<typeof readAllYearsRouteDefinition.schemas.return>[number]

export function YearCard(props: {
    year: Year
    idOrganization: string
}) {
    const { year, idOrganization } = props

    const startDate = formatDate(year.startingAt)
    const endDate = formatDate(year.endingAt)

    return (
        <div className={cx(
            css({ width: "100%", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4" }),
            css({ borderBottom: "1px solid", borderBottomColor: "neutral/10", _last: { borderBottom: "none" } })
        )}>
            <div className={css({ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                <div className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "start",
                    gap: "1rem"
                })}>
                    <div className={css({ display: "flex", alignItems: "center", gap: "0.75rem" })}>
                        <div className={cx(
                            css({ width: "2.5rem", height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "md" }),
                            year.isClosed ? css({ backgroundColor: "neutral/10" }) : css({ backgroundColor: "success/5" })
                        )}>
                            {year.isClosed ? (
                                <IconLock className={css({ width: "1.25rem", height: "1.25rem", color: "neutral/50" })} />
                            ) : (
                                <IconCalendar className={css({ width: "1.25rem", height: "1.25rem", color: "success/70" })} />
                            )}
                        </div>
                        <Link
                            to="/dashboard/organisations/$idOrganization/exercices/$idYear"
                            params={{
                                idOrganization: idOrganization,
                                idYear: year.id
                            }}
                            className={css({
                                fontSize: "base",
                                fontWeight: "semibold",
                                color: "primary",
                                _hover: { textDecoration: "underline" }
                            })}
                        >
                            {year.label}
                        </Link>
                    </div>
                    <div className={css({ display: "flex", justifyContent: "end", alignItems: "start", gap: "0.5rem" })}>
                        {year.isClosed ? (
                            <Chip
                                text="Clôturé"
                                color="neutral"
                            />
                        ) : (
                            <Chip
                                text="En cours"
                                color="success"
                            />
                        )}
                    </div>
                </div>
                <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" })}>
                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                        {startDate} — {endDate}
                    </span>
                </div>
            </div>
        </div>
    )
}
