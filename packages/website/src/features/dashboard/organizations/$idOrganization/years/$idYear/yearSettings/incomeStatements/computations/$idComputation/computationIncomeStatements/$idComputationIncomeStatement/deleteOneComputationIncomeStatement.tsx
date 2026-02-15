import { deleteOneComputationIncomeStatementRouteDefinition, readAllComputationIncomeStatementsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ComponentPropsWithRef, ReactElement } from "react"
import * as v from "valibot"
import { DeleteConfirmation } from "../../../../../../../../../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../../../../../../../../../contexts/toasts/useToast.ts"
import { applicationRouter } from "../../../../../../../../../../../../routes/applicationRouter.tsx"
import { invalidateData } from "../../../../../../../../../../../../utilities/invalidateData.ts"
import { postAPI } from "../../../../../../../../../../../../utilities/postAPI.ts"


export function DeleteOneComputationIncomeStatement(props: {
    computationIncomeStatement: v.InferOutput<typeof returnedSchemas.computationIncomeStatement>
    children: ReactElement<ComponentPropsWithRef<'div'>>
}) {
    async function onSubmit() {
        const deleteResponse = await postAPI({
            routeDefinition: deleteOneComputationIncomeStatementRouteDefinition,
            body: {
                idComputationIncomeStatement: props.computationIncomeStatement.id,
                idOrganization: props.computationIncomeStatement.idOrganization,
                idYear: props.computationIncomeStatement.idYear,
            }
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression de la ligne de compte de résultat", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllComputationIncomeStatementsRouteDefinition,
            body: {
                idOrganization: props.computationIncomeStatement.idOrganization,
                idYear: props.computationIncomeStatement.idYear,
            },
        })

        toast({ title: "Ligne de compte de résultat supprimée", variant: "success" })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat",
            params: {
                idOrganization: props.computationIncomeStatement.idOrganization,
                idYear: props.computationIncomeStatement.idYear
            },
        })
    }

    return (
        <DeleteConfirmation
            title="Voulez-vous supprimer cette ligne de compte de résultat ?"
            description={<>Cette action supprimera la ligne de compte de résultat et toutes les données associées.<br />Cette action est irréversible.</>}
            submitText="Supprimer la ligne de compte de résultat"
            onSubmit={onSubmit}
        >
            {props.children}
        </DeleteConfirmation>
    )
}
