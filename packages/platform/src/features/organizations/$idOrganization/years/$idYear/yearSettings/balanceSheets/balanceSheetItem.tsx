import { GroupedBalanceSheet } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/groupBalanceSheets.js"
import { cn } from "#/utilities/cn.js"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { Link } from "@tanstack/react-router"
import { ComponentProps, Fragment } from "react"
import * as v from "valibot"


export function BalanceSheetItem(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    groupedBalanceSheet: GroupedBalanceSheet
    displayIndexes: Array<boolean>
    currentIndex: number
    length: number
    level: number
    className?: ComponentProps<'div'>['className']
}) {
    const tab = "&nbsp;&nbsp;&thinsp;&thinsp;"

    const lastArrow = (props.currentIndex === props.length - 1)
        ? "└──"
        : "├──"

    const prefix = (props.level > 0)
        ? `${(new Array(props.level - 1).fill("").map((_, index) => {
            if (props.displayIndexes[index + 1] === true) {
                return `│${tab}`
            }
            return `&nbsp;${tab}`
        }))
            .join("")
        }${lastArrow}`
        : null
    // ? (props.index !== props.length - 1)
    //                                     ? `&thinsp;&thinsp;${(new Array(props.level - 1).fill(`${(props.index !== props.length - 1)
    //                                         ? "│"
    //                                         : "&thinsp;"
    //                                         }&nbsp;&nbsp;&thinsp;&thinsp;`)).join("")}`
    //                                     : `&thinsp;&thinsp;${(new Array(props.level - 1).fill("&nbsp;&nbsp;&thinsp;&thinsp;")).join("")}${lastArrow}`
    //                                 : ""

    return (
        <Fragment>
            <Link
                to="/organisations/$idOrganization/exercices/$idYear/paramètres/bilan/$idBalanceSheet"
                params={{
                    idOrganization: props.idOrganization,
                    idYear: props.idYear,
                    idBalanceSheet: props.groupedBalanceSheet.balanceSheet.id,
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
                        (prefix === null)
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
                            {props.groupedBalanceSheet.balanceSheet.number}
                        </span>
                        <span className={cn(
                            "text-neutral text-xs text-left leading-none whitespace-nowrap",
                        )}>
                            {props.groupedBalanceSheet.balanceSheet.label}
                        </span>
                    </div>
                </div>
            </Link>
            {
                props.groupedBalanceSheet.subBalanceSheets
                    .sort((a, b) => a.balanceSheet.number.localeCompare(b.balanceSheet.number))
                    .map((groupedSubBalanceSheet, index) => (
                        <BalanceSheetItem
                            key={groupedSubBalanceSheet.balanceSheet.id}
                            idOrganization={props.idOrganization}
                            idYear={props.idYear}
                            groupedBalanceSheet={groupedSubBalanceSheet}
                            displayIndexes={[...props.displayIndexes, (props.currentIndex < props.length - 1)]}
                            currentIndex={index}
                            length={props.groupedBalanceSheet.subBalanceSheets.length}
                            level={props.level + 1}
                        />
                    ))
            }
        </Fragment>
    )
}
