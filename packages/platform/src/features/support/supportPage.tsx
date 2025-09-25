import { ButtonOutlineContent } from "#/components/buttons/buttonOutlineContent.js";
import { Box } from "#/components/layouts/box.js";
import { Page } from "#/components/layouts/page/page.js";
import { ContactSupportForm } from "#/features/support/contactSupportForm.js";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";


export function SupportPage() {
    return (
        <Page.Root>
            <Page.Content>
                <Box className="p-4 gap-4">
                    <span>
                        N'hésitez pas à contacter le support
                    </span>
                    <ContactSupportForm />
                </Box>
                <Box className="p-4 gap-4">
                    <span>
                        Vous pouvez aussi nous contacter directement via les moyens suivant
                    </span>
                    <div className="flex justify-start items-start gap-2">
                        <a
                            href="mailto:contact@arrhes.com"
                        >
                            <ButtonOutlineContent
                                icon={<IconMail />}
                                text="Email"
                            />
                        </a>
                        <a
                            href="https://github.com/arrhes"
                        >
                            <ButtonOutlineContent
                                icon={<IconBrandGithub />}
                                text="Github"
                            />
                        </a>
                        <a
                            href="https://linkedin.com/arrhes"
                        >
                            <ButtonOutlineContent
                                icon={<IconBrandLinkedin />}
                                text="LinkedIn"
                            />
                        </a>
                    </div>
                </Box>
            </Page.Content>
        </Page.Root>
    )
}