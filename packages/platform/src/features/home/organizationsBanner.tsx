import { ButtonPlainContent } from "#/components/buttons/buttonPlainContent.js"
import { Box } from "#/components/layouts/box.js"
import { IconBuilding } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"


export function OrganizationsBanner() {
    return (
        <Box className="p-8 gap-4">
            <div className="flex flex-col justify-start items-start">
                <h2 className="text-2xl">Mes organisations</h2>
                <p className="text-neutral/50">Que vous avez créées ou auxquelles vous avez été invité</p>
            </div>
            <Link
                to="/organisations"
                className="w-fit"
            >
                <ButtonPlainContent
                    icon={<IconBuilding />}
                    text="Voir mes organisations"
                />
            </Link>
        </Box>
    )
}
