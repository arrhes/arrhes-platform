import { toast } from "#/contexts/toasts/useToast.js"
import { postAPI } from "#/utilities/postAPI.js"
import { generateIncomeStatementReportDocumentRouteDefinition, generateDocumentGetSignedUrlRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ButtonHTMLAttributes, cloneElement, ReactElement } from "react"
import * as v from "valibot"


export function DownloadIncomeStatementReport(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    children: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>
}) {
    return (
        cloneElement(
            props.children,
            {
                onClick: async () => {
                    const generateBalanceSheetReportDocumentResponse = await postAPI({
                        routeDefinition: generateIncomeStatementReportDocumentRouteDefinition,
                        body: {
                            idOrganization: props.idOrganization,
                            idYear: props.idYear,
                        },
                    })
                    if (generateBalanceSheetReportDocumentResponse.ok === false) {
                        toast({ title: "Impossible de générer le document", variant: "error" })
                        return
                    }

                    const downloadBalanceSheetReportDocumentResponse = await postAPI({
                        routeDefinition: generateDocumentGetSignedUrlRouteDefinition,
                        body: {
                            idOrganization: props.idOrganization,
                            idYear: props.idYear,
                            idDocument: generateBalanceSheetReportDocumentResponse.data.id,
                        }
                    })
                    if (downloadBalanceSheetReportDocumentResponse.ok === false) {
                        toast({ title: "Impossible de télécharger le document", variant: "error" })
                        return
                    }

                    const url = downloadBalanceSheetReportDocumentResponse.data.url
                    const link = document.createElement('a')
                    link.href = url
                    link.target = '_blank'
                    link.download = `${generateBalanceSheetReportDocumentResponse.data.label}.pdf`
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                }
            }
        )
    )
}
