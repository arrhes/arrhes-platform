import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../../../../../components/layouts/box.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { accountsRoute } from "../../../../../../../../routes/root/docs/accounting/accountsRoute.tsx"
import { AccountsTable } from "./accountsTable.tsx"
import { CreateOneAccount } from "./createOneAccount.tsx"
import { GenerateAccounts } from "./generateAccounts.tsx"


export function AccountsPage() {
    const params = useParams({ from: accountsRoute.id })

    return (
        <Section.Root>
            <Section.Item>
                <div className={css({ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2" })}>
                    <CreateOneAccount
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonContent
                            variant="primary"
                            leftIcon={<IconPlus />}
                            text="Ajouter un compte"
                        />
                    </CreateOneAccount>
                    <GenerateAccounts
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonContent
                            variant="default"
                            leftIcon={<IconPlus />}
                            text="Générer les comptes par défaut"
                        />
                    </GenerateAccounts>
                </div>
                <Box className={css({ maxH: "640px" })}>
                    <AccountsTable
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    />
                </Box>
            </Section.Item>
        </Section.Root>
    )
}