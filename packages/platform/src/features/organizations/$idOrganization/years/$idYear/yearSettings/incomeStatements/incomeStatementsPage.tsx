import { ButtonOutlineContent } from "#/components/buttons/buttonOutlineContent.js"
import { ButtonPlainContent } from "#/components/buttons/buttonPlainContent.js"
import { Box } from "#/components/layouts/box.js"
import { Section } from "#/components/layouts/section/section.js"
import { ComputationsTable } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/computationsTable.js"
import { CreateOneComputation } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/createOneComputation.js"
import { GenerateComputations } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/generateComputations.js"
import { ConnectAccountsToIncomeStatements } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/connectAccountsToIncomeStatements.js"
import { CreateOneIncomeStatement } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/createOneIncomeStatement.js"
import { GenerateIncomeStatements } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/generateIncomeStatement.js"
import { IncomeStatementsTable } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsTable.js"
import { incomeStatementsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsRoute.js"
import { IconLine, IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"


export function IncomeStatementsPage() {
    const params = useParams({ from: incomeStatementsRoute.id })

    return (
        <Section.Root>
            <Section.Item>
                <div className="min-w-full flex justify-end items-center gap-2 flex-wrap">
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
                            text="Générer les lignes de compte de résultat par défaut"
                        />
                    </GenerateIncomeStatements>
                    <ConnectAccountsToIncomeStatements
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonOutlineContent
                            icon={<IconLine />}
                            text="Connecter les comptes aux lignes de compte de résultat par défaut"
                        />
                    </ConnectAccountsToIncomeStatements>
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
                <Box className="max-h-[640px] p-4">
                    <ComputationsTable
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    />
                </Box>
            </Section.Item>
        </Section.Root>
    )
}