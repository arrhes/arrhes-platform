import { IconPlus } from "@tabler/icons-react";
import { useParams } from "@tanstack/react-router";
import { ButtonOutlineContent } from "components/buttons/buttonOutlineContent";
import { ButtonPlainContent } from "components/buttons/buttonPlainContent";
import { Box } from "components/layouts/box";
import { Section } from "components/layouts/section/section";
import { AccountsTable } from "features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsTable";
import { CreateOneAccount } from "features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/createOneAccount";
import { GenerateAccounts } from "features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/generateAccounts";
import { accountsRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsRoute";


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