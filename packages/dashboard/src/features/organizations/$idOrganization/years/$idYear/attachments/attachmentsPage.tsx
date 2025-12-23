import { DataWrapper } from "#/components/layouts/dataWrapper.js";
import { Page } from "#/components/layouts/page/page.js";
import { AttachmentsTable } from "#/features/organizations/$idOrganization/years/$idYear/attachments/attachmentsTable.js";
import { attachmentsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/attachmentsLayoutRoute.js";
import { readAllAttachmentsRouteDefinition } from "@arrhes/application-metadata/routes";
import { useParams } from "@tanstack/react-router";


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