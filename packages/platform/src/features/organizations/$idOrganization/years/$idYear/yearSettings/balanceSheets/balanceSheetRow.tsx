import { cn } from "#/utilities/cn.js"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { Link } from "@tanstack/react-router"
import { ComponentProps } from "react"
import * as v from "valibot"


export function BalanceSheetRow(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    balanceSheet: v.InferOutput<typeof returnedSchemas.balanceSheet>
    level: number
    className?: ComponentProps<'div'>['className']
}) {

    const prefix = `${(new Array(props.level).fill("").map((_) => {
        return "&nbsp;&nbsp;"
    }))
        .join("")
        }`

    return (
        <Link
            to="/organisations/$idOrganization/exercices/$idYear/paramètres/bilan/$idBalanceSheet"
            params={{
                idOrganization: props.idOrganization,
                idYear: props.idYear,
                idBalanceSheet: props.balanceSheet.id,
            }}
            className="w-full"
        >
            <div
                className="min-w-fit w-full flex justify-start items-center gap-2 hover:bg-neutral/5 border-b border-neutral/5 last:border-b-0"
            // style={{
            //     paddingLeft: `${(1 + props.level) * 12}px`
            // }}
            >
                {
                    (prefix === "")
                        ? (null)
                        : (
                            <pre
                                className={cn(
                                    "text-neutral/25 text-[22px] leading-none h-full align-middle text-left",
                                )}
                                dangerouslySetInnerHTML={{
                                    __html: prefix
                                }}
                            />
                        )
                }
                <div className="p-1 flex justify-start items-center gap-2">
                    <span className={cn(
                        "text-neutral text-xs leading-none",
                    )}>
                        {props.balanceSheet.number}
                    </span>
                    <span className={cn(
                        "text-neutral text-xs text-left leading-none whitespace-nowrap",
                    )}>
                        {props.balanceSheet.label}
                    </span>
                </div>
            </div>
        </Link>
    )
}
