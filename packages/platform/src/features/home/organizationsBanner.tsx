import { IconBuilding } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { ButtonPlainContent } from "components/buttons/buttonPlainContent"
import { Box } from "components/layouts/box"


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
