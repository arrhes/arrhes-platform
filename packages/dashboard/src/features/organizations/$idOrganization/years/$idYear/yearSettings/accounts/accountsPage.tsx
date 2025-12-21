import { ButtonOutlineContent } from "#/components/buttons/buttonOutlineContent.js";
import { ButtonPlainContent } from "#/components/buttons/buttonPlainContent.js";
import { Box } from "#/components/layouts/box.js";
import { Section } from "#/components/layouts/section/section.js";
import { AccountsTable } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsTable.js";
import { CreateOneAccount } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/createOneAccount.js";
import { GenerateAccounts } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/generateAccounts.js";
import { accountsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsRoute.js";
import { IconPlus } from "@tabler/icons-react";
import { useParams } from "@tanstack/react-router";


export function AccountsPage() {
    const params = useParams({ from: accountsRoute.id })

    return (
        <Section.Root>
            <Section.Item>
                <div className="w-full flex justify-end items-center gap-2">
                    <CreateOneAccount
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonPlainContent
                            icon={<IconPlus />}
                            text="Ajouter un compte"
                        />
                    </CreateOneAccount>
                    <GenerateAccounts
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonOutlineContent
                            icon={<IconPlus />}
                            text="Générer les comptes par défaut"
                        />
                    </GenerateAccounts>
                </div>
                <Box className="max-h-[640px]">
                    <AccountsTable
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    />
                </Box>
            </Section.Item>
        </Section.Root>
    )
}