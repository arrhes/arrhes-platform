import { readAllRecordRowsRouteDefinition, readAllRecordsRouteDefinition } from "@arrhes/schemas/routes"
import { useParams } from "@tanstack/react-router"
import { Box } from "components/layouts/box"
import { DataWrapper } from "components/layouts/dataWrapper"
import { Section } from "components/layouts/section/section"
import { JournalReportTable } from "features/organizations/$idOrganization/years/$idYear/reports/journalReport/journalReportTable"
import { journalReportRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/reports/journalReportRoute"


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
                                                recordRows={recordRows}
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