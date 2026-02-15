import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react"
import { Box } from "../../../components/layouts/box.tsx"
import { Page } from "../../../components/layouts/page/page.tsx"
import { ContactSupportForm } from "./contactSupportForm.tsx"


export function SupportPage() {
    return (
        <Page.Root>
            <Page.Content>
                <Box className={css({ padding: "4", gap: "4" })}>
                    <span>
                        N'hésitez pas à contacter le support
                    </span>
                    <ContactSupportForm />
                </Box>
                <Box className={css({ padding: "4", gap: "4" })}>
                    <span>
                        Vous pouvez aussi nous contacter directement via les moyens suivant
                    </span>
                    <div className={css({ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", gap: "2" })}>
                        <a
                            href="mailto:contact@arrhes.com"
                        >
                            <ButtonContent
                                variant="default"
                                leftIcon={<IconMail />}
                                text="Email"
                            />
                        </a>
                        <a
                            href="https://github.com/arrhes"
                        >
                            <ButtonContent
                                variant="default"
                                leftIcon={<IconBrandGithub />}
                                text="Github"
                            />
                        </a>
                        <a
                            href="https://linkedin.com/arrhes"
                        >
                            <ButtonContent
                                variant="default"
                                leftIcon={<IconBrandLinkedin />}
                                text="LinkedIn"
                            />
                        </a>
                    </div>
                </Box>
            </Page.Content>
        </Page.Root>
    )
}