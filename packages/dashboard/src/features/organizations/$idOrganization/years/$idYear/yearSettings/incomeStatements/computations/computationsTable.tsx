import { FormatNull } from "#/components/formats/formatNull.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { cn } from "#/utilities/cn.js"
import { readAllComputationsRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { Link } from "@tanstack/react-router"
import * as v from "valibot"


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
                    <div className="h-fit w-full flex flex-col justify-start items-start p-4">
                        {computations.map((computation) => (
                            <Link
                                key={computation.id}
                                to="/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/calculs/$idComputation"
                                params={{
                                    idComputation: computation.id,
                                    idOrganization: props.idOrganization,
                                    idYear: props.idYear,
                                }}
                                className="w-full"
                            >
                                <div className="p-2 min-w-fit w-full flex justify-start items-center gap-2 hover:bg-neutral/5 border-b border-neutral/5 last:border-b-0">
                                    <span className={cn(
                                        "text-neutral text-xs leading-none",
                                    )}>
                                        {computation.number}
                                    </span>
                                    <span className={cn(
                                        "text-neutral text-xs text-left leading-none whitespace-nowrap",
                                    )}>
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