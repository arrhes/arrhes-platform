import { IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { ButtonOutlineContent } from "components/buttons/buttonOutlineContent"
import { ButtonPlainContent } from "components/buttons/buttonPlainContent"
import { Box } from "components/layouts/box"
import { Section } from "components/layouts/section/section"
import { ComputationsTable } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/computationsTable"
import { CreateOneComputation } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/createOneComputation"
import { GenerateComputations } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/generateComputations"
import { CreateOneIncomeStatement } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/createOneIncomeStatement"
import { GenerateIncomeStatements } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/generateIncomeStatement"
import { IncomeStatementsTable } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsTable"
import { incomeStatementsRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsRoute"


export function IncomeStatementsPage() {
    const params = useParams({ from: incomeStatementsRoute.id })

    return (
        <Section.Root>
            <Section.Item>
                <div className="w-full flex justify-end items-center gap-2">
                    <CreateOneIncomeStatement
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonPlainContent
                            icon={<IconPlus />}
                            text="Ajouter une ligne de compte de résultat"
                        />
                    </CreateOneIncomeStatement>
                    <GenerateIncomeStatements
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonOutlineContent
                            icon={<IconPlus />}
                            text="Générer le compte de résultat par défaut"
                        />
                    </GenerateIncomeStatements>
                </div>
                <Box className="max-h-[640px]">
                    <IncomeStatementsTable
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    />
                </Box>
            </Section.Item>
            <Section.Item>
                <div className="w-full flex justify-end items-start gap-2">
                    <CreateOneComputation
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonPlainContent
                            icon={<IconPlus />}
                            text="Ajouter une ligne de calcul"
                        />
                    </CreateOneComputation>
                    <GenerateComputations
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonOutlineContent
                            icon={<IconPlus />}
                            text="Générer les calculs par défaut"
                        />
                    </GenerateComputations>
                </div>
                <Box className="max-h-[640px]">
                    <ComputationsTable
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    />
                </Box>
            </Section.Item>
        </Section.Root>
    )
}