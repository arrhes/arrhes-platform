import { ButtonContent } from "@arrhes/ui"
import { Box } from "../../components/layouts/box.js"
import { css } from "../../utilities/cn.js"
import { IconBuilding } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"


export function OrganizationsBanner() {
    return (
        <Box className={css({ p: "8", gap: "4" })}>
            <div className={css({ display: "flex", flexDir: "column", justifyContent: "flex-start", alignItems: "flex-start" })}>
                <h2 className={css({ fontSize: "2xl" })}>Mes organisations</h2>
                <p className={css({ color: "neutral/50" })}>Que vous avez créées ou auxquelles vous avez été invité</p>
            </div>
            <Link
                to="/organisations"
                className={css({ w: "fit-content" })}
            >
                <ButtonContent
                    variant="primary"
                    icon={<IconBuilding />}
                    text="Voir mes organisations"
                />
            </Link>
        </Box>
    )
}
