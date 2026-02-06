import { readAllYearsRouteDefinition } from "@arrhes/application-metadata/routes"
import { cx, css } from "@arrhes/ui/utilities/cn.js"
import { IconCalendar, IconChevronRight, IconLock } from "@tabler/icons-react"
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
        <Link
            to="/organisations/$idOrganization/exercices/$idYear"
            params={{
                idOrganization: idOrganization,
                idYear: year.id
            }}
            className={cx(
                css({ w: "full", p: "4", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4" }),
                css({ border: "1px solid", borderColor: "neutral/10", rounded: "md" }),
                css({ _hover: { borderColor: "neutral/20", bg: "neutral/2" }, transition: "colors", cursor: "pointer" })
            )}
        >
            <div className={css({ display: "flex", alignItems: "center", gap: "4" })}>
                <div className={cx(
                    css({ w: "12", h: "12", display: "flex", alignItems: "center", justifyContent: "center", rounded: "md" }),
                    year.isClosed ? css({ bg: "neutral/10" }) : css({ bg: "success/5" })
                )}>
                    {year.isClosed ? (
                        <IconLock className={css({ w: "6", h: "6", color: "neutral/50" })} />
                    ) : (
                        <IconCalendar className={css({ w: "6", h: "6", color: "success/70" })} />
                    )}
                </div>
                <div className={css({ display: "flex", flexDir: "column", gap: "1" })}>
                    <span className={css({ fontSize: "base", fontWeight: "medium", color: "neutral" })}>
                        {year.label}
                    </span>
                    <div className={css({ display: "flex", alignItems: "center", gap: "2" })}>
                        <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                            {startDate} — {endDate}
                        </span>
                    </div>
                </div>
            </div>
            <div className={css({ display: "flex", alignItems: "center", gap: "2" })}>
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
                <IconChevronRight className={css({ w: "5", h: "5", color: "neutral/30" })} />
            </div>
        </Link>
    )
}
