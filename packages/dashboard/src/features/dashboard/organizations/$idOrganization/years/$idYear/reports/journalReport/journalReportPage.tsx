import { readAllRecordRowsRouteDefinition, readAllRecordsRouteDefinition } from "@arrhes/application-metadata/routes"
import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../../../../../components/layouts/box.tsx"
import { DataWrapper } from "../../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { journalReportRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/journalReportRoute.tsx"
import { JournalReportTable } from "./journalReportTable.tsx"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"


export function JournalReportPage() {
    const params = useParams({ from: journalReportRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <Section.Root>
                    <Section.Item>
                        <DataWrapper
                            routeDefinition={readAllRecordsRouteDefinition}
                            body={{
                                idOrganization: params.idOrganization,
                                idYear: params.idYear,
                            }}
                        >
                            {(records) => {
                                return (
                                    <DataWrapper
                                        routeDefinition={readAllRecordRowsRouteDefinition}
                                        body={{
                                            idOrganization: params.idOrganization,
                                            idYear: params.idYear,
                                            idRecord: undefined
                                        }}
                                    >
                                        {(recordRows) => {
                                            return (
                                                <Box>
                                                    <JournalReportTable
                                                        records={records}
                                                        recordRows={recordRows.filter((recordRow) => recordRow.isComputedForJournalReport === true)}
                                                    />
                                                </Box>
                                            )
                                        }}
                                    </DataWrapper>
                                )
                            }}
                        </DataWrapper>
                    </Section.Item>
                </Section.Root>
            </Page.Content>
        </Page.Root>
    )
}