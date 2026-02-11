import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { recordLabelsRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/recordLabelsRoute.tsx"
import { CreateOneRecordLabel } from "./createOneRecordLabel.tsx"
import { RecordLabelsListTable } from "./recordLabelsListTable.tsx"


export function RecordLabelsPage() {
    const params = useParams({ from: recordLabelsRoute.id })

    return (
        <Section.Root>
            <Section.Item>
                <div className={css({ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2" })}>
                    <CreateOneRecordLabel
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonContent
                            variant="primary"
                            leftIcon={<IconPlus />}
                            text="Ajouter une catégorie"
                        />
                    </CreateOneRecordLabel>
                </div>
                <RecordLabelsListTable
                    idOrganization={params.idOrganization}
                    idYear={params.idYear}
                />
            </Section.Item>
        </Section.Root>
    )
}
