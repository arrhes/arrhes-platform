import { readAllYearsRouteDefinition } from "@arrhes/application-metadata/routes"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
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
                css({ width: "100%", p: "4", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4" }),
                css({ border: "1px solid", borderColor: "neutral/10", rounded: "md" }),
                css({ _hover: { borderColor: "neutral/20", backgroundColor: "neutral/2" }, transition: "colors", cursor: "pointer" })
            )}
        >
            <div className={css({ display: "flex", alignItems: "center", gap: "4" })}>
                <div className={cx(
                    css({ width: "12", height: "12", display: "flex", alignItems: "center", justifyContent: "center", rounded: "md" }),
                    year.isClosed ? css({ backgroundColor: "neutral/10" }) : css({ backgroundColor: "success/5" })
                )}>
                    {year.isClosed ? (
                        <IconLock className={css({ width: "6", height: "6", color: "neutral/50" })} />
                    ) : (
                        <IconCalendar className={css({ width: "6", height: "6", color: "success/70" })} />
                    )}
                </div>
                <div className={css({ display: "flex", flexDirection: "column", gap: "1" })}>
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
                <IconChevronRight className={css({ width: "5", height: "5", color: "neutral/30" })} />
            </div>
        </Link>
    )
}
