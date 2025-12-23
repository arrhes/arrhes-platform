import { Box } from "#/components/layouts/box.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { Section } from "#/components/layouts/section/section.js"
import { JournalReportTable } from "#/features/organizations/$idOrganization/years/$idYear/reports/journalReport/journalReportTable.js"
import { journalReportRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/journalReportRoute.js"
import { readAllRecordRowsRouteDefinition, readAllRecordsRouteDefinition } from "@arrhes/application-metadata/routes"
import { useParams } from "@tanstack/react-router"


export function JournalReportPage() {
    const params = useParams({ from: journalReportRoute.id })

    return (
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
    )
}