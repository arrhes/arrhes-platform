import { readAllAttachmentsRouteDefinition } from "@arrhes/schemas/routes";
import { useParams } from "@tanstack/react-router";
import { DataWrapper } from "components/layouts/dataWrapper";
import { Page } from "components/layouts/page/page";
import { AttachmentsTable } from "features/organizations/$idOrganization/years/$idYear/attachments/attachmentsTable";
import { attachmentsLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/attachmentsLayoutRoute";


export function AttachmentsPage() {
    const params = useParams({ from: attachmentsLayoutRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readAllAttachmentsRouteDefinition}
                    body={{
                        idOrganization: params.idOrganization,
                        idYear: params.idYear,
                    }}
                >
                    {(attachments) => {
                        return (
                            <AttachmentsTable
                                idOrganization={params.idOrganization}
                                idYear={params.idYear}
                                attachments={attachments}
                            />
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}