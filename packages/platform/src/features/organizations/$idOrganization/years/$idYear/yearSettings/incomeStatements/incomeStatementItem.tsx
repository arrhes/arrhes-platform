import { returnedSchemas } from "@arrhes/schemas/schemas"
import { Link } from "@tanstack/react-router"
import { GroupedIncomeStatement } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/groupIncomeStatements"
import { ComponentProps, Fragment } from "react"
import { cn } from "utilities/cn"
import * as v from "valibot"


export function IncomeStatementItem(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    groupedIncomeStatement: GroupedIncomeStatement
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
                to="/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/$idIncomeStatement"
                params={{
                    idOrganization: props.idOrganization,
                    idYear: props.idYear,
                    idIncomeStatement: props.groupedIncomeStatement.incomeStatement.id,
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
                            {props.groupedIncomeStatement.incomeStatement.number}
                        </span>
                        <span className={cn(
                            "text-neutral text-xs text-left leading-none whitespace-nowrap",
                        )}>
                            {props.groupedIncomeStatement.incomeStatement.label}
                        </span>
                    </div>
                </div>
            </Link>
            {
                props.groupedIncomeStatement.subIncomeStatements
                    .sort((a, b) => a.incomeStatement.number.localeCompare(b.incomeStatement.number))
                    .map((groupedSubIncomeStatement, index) => (
                        <IncomeStatementItem
                            key={groupedSubIncomeStatement.incomeStatement.id}
                            idOrganization={props.idOrganization}
                            idYear={props.idYear}
                            groupedIncomeStatement={groupedSubIncomeStatement}
                            displayIndexes={[...props.displayIndexes, (props.currentIndex < props.length - 1)]}
                            currentIndex={index}
                            length={props.groupedIncomeStatement.subIncomeStatements.length}
                            level={props.level + 1}
                        />
                    ))
            }
        </Fragment>
    )
}
