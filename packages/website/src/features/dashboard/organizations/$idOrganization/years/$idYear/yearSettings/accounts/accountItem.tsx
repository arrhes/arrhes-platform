import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { ComponentProps, Fragment } from "react"
import * as v from "valibot"
import { LinkButton } from "../../../../../../../../components/linkButton.tsx"


export function AccountItem(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    account: v.InferOutput<typeof returnedSchemas.account>
    level: number
    displayIndexes: Array<boolean>
    currentIndex: number
    length: number
    className?: ComponentProps<'div'>['className']
}) {
    const tab = "&nbsp;&nbsp;"

    // const lastArrow = (props.currentIndex === props.length - 1)
    //     ? "└──"
    //     : "├──"

    // const prefix = (props.level > 0)
    //     ? `${(new Array(props.level - 1).fill("").map((_, index) => {
    //         if (props.displayIndexes[index + 1] === true) {
    //             return `│${tab}`
    //         }
    //         return `&nbsp;${tab}`
    //     }))
    //         .join("")
    //     }${lastArrow}`
    //     : null
    const prefix = `${(new Array(props.level).fill("").map((_, index) => {
        return `${tab}`
    }))
        .join("")
        }`
    // ? (props.index !== props.length - 1)
    //                                     ? `&thinsp;&thinsp;${(new Array(props.level - 1).fill(`${(props.index !== props.length - 1)
    //                                         ? "│"
    //                                         : "&thinsp;"
    //                                         }&nbsp;&nbsp;&thinsp;&thinsp;`)).join("")}`
    //                                     : `&thinsp;&thinsp;${(new Array(props.level - 1).fill("&nbsp;&nbsp;&thinsp;&thinsp;")).join("")}${lastArrow}`
    //                                 : ""

    return (
        <Fragment>
            <LinkButton
                to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/comptes/$idAccount"
                params={{
                    idOrganization: props.idOrganization,
                    idYear: props.idYear,
                    idAccount: props.account.id,
                }}
                className={css({ width: "100%" })}
            >
                <div
                    className={css({ minWidth: "fit", width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "2", _hover: { backgroundColor: "neutral/5" }, borderBottomWidth: "1px", borderColor: "neutral/5", _last: { borderBottomWidth: "0" } })}
                // style={{
                //     paddingLeft: `${(1 + props.level) * 12}px`
                // }}
                >
                    {
                        (prefix === null)
                            ? (null)
                            : (
                                <pre
                                    className={cx(
                                        css({ color: "neutral/25", fontSize: "22px", lineHeight: "none", height: "100%", verticalAlign: "middle", textAlign: "left" }),
                                        props.account.isMandatory ? "" : ""
                                    )}
                                    dangerouslySetInnerHTML={{
                                        __html: prefix
                                    }}
                                />
                            )
                    }
                    <div className={css({ padding: "1", display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "2" })}>
                        <span className={cx(
                            css({ color: "neutral", fontSize: "xs", lineHeight: "none" }),
                            props.account.isMandatory ? css({ fontWeight: "bold" }) : ""
                        )}>
                            {props.account.number}
                        </span>
                        <span className={cx(
                            css({ color: "neutral", fontSize: "xs", textAlign: "left", lineHeight: "none", whiteSpace: "nowrap" }),
                            props.account.isMandatory ? css({ fontWeight: "bold" }) : ""
                        )}>
                            {props.account.label}
                        </span>
                    </div>
                </div>
            </LinkButton>
        </Fragment>
    )
}
