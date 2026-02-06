import { readAllComputationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { Link } from "@tanstack/react-router"
import * as v from "valibot"
import { FormatNull } from "../../../../../../../../../components/formats/formatNull.tsx"
import { DataWrapper } from "../../../../../../../../../components/layouts/dataWrapper.tsx"


export function ComputationsTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
}) {
    return (
        <DataWrapper
            routeDefinition={readAllComputationsRouteDefinition}
            body={{
                idOrganization: props.idOrganization,
                idYear: props.idYear
            }}
        >
            {(computations) => {
                if (computations.length === 0) {
                    return (
                        <FormatNull
                            text="Aucune ligne de calcul"
                        />
                    )
                }
                return (
                    <div className={css({ h: "fit-content", w: "full", display: "flex", flexDir: "column", justifyContent: "flex-start", alignItems: "flex-start", p: "4" })}>
                        {computations.map((computation) => (
                            <Link
                                key={computation.id}
                                to="/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/calculs/$idComputation"
                                params={{
                                    idComputation: computation.id,
                                    idOrganization: props.idOrganization,
                                    idYear: props.idYear,
                                }}
                                className={css({ w: "full" })}
                            >
                                <div className={css({ p: "2", minW: "fit-content", w: "full", display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "2", _hover: { bg: "neutral/5" }, borderBottom: "1px solid", borderColor: "neutral/5", _last: { borderBottom: "0" } })}>
                                    <span className={css({ color: "neutral", fontSize: "xs", lineHeight: "none" })}>
                                        {computation.number}
                                    </span>
                                    <span className={css({ color: "neutral", fontSize: "xs", textAlign: "left", lineHeight: "none", whiteSpace: "nowrap" })}>
                                        {computation.label}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )
            }}
        </DataWrapper>
    )
}