import { FormatError } from "#/components/formats/formatError.js"
import { CircularLoader } from "#/components/layouts/circularLoader.js"
import { cn } from "#/utilities/cn.js"
import { useHTTPData } from "#/utilities/useHTTPData.js"
import { routeDefinition } from "@arrhes/metadata/utilities"
import { ComponentProps, ReactElement, Suspense } from "react"
import * as v from "valibot"


export function DataWrapper<
    TRouteDefinition extends ReturnType<typeof routeDefinition>
>(props: {
    routeDefinition: TRouteDefinition
    body: v.InferInput<TRouteDefinition["schemas"]["body"]>
    children: (data: v.InferOutput<TRouteDefinition["schemas"]["return"]>) => ReactElement | Array<ReactElement> | null
    className?: ComponentProps<'div'>['className']
    loaderProps?: ComponentProps<typeof CircularLoader>
    errorProps?: ComponentProps<typeof FormatError>
}) {
    const response = useHTTPData({
        routeDefinition: props.routeDefinition,
        body: props.body,
    })

    if (response.data === undefined) {
        if (response.isPending) {
            return (
                <CircularLoader
                    {...props.loaderProps}
                    text={props.loaderProps?.text ?? "Chargement des données..."}
                    className={cn(
                        "p-2",
                        props.loaderProps?.className,
                    )}
                />
            )
        }
        return (
            <FormatError
                {...props.errorProps}
                text={props.errorProps?.text ?? "Erreur lors de la récupération des données."}
                className="p-2"
            />
        )
    }

    return (
        <Suspense fallback={<CircularLoader />}>
            {props.children(response.data)}
        </Suspense>
    )
}
