import { ButtonContent, Logo } from "@arrhes/ui"
import {
    IconBook2,
    IconBrandGithub,
    IconMenu2,
    IconX
} from "@tabler/icons-react"
import { Outlet, useRouterState } from "@tanstack/react-router"
import { useState } from "react"
import { LinkButton } from "../../components/linkButton.js"
import { css, cx } from "../../utilities/cn.js"
import { SectionTab } from "./components/sectionTab.js"
import { SidebarNavigation } from "./components/sidebarNavigation.js"
import { docSections } from "./docSections.js"


type DocSectionId = keyof typeof docSections


function getCurrentSection(pathname: string): DocSectionId {
    if (pathname.startsWith("/documentation/comptabilite")) return "comptabilite"
    if (pathname.startsWith("/documentation/dashboard")) return "dashboard"
    // if (pathname.startsWith("/documentation/api")) return "api"
    // if (pathname.startsWith("/documentation/ai")) return "ai"
    return "general"
}


export function DocumentationLayout() {
    const pathname = useRouterState({ select: (s) => s.location.pathname })
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const currentSectionId = getCurrentSection(pathname)
    const currentSection = docSections[currentSectionId]

    return (
        <div className={css({
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background"
        })}>
            {/* Header */}
            <header className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                borderBottom: "1px solid",
                borderColor: "neutral/8",
                backgroundColor: "white",
                position: "sticky",
                top: "0",
                zIndex: "20"
            })}>
                {/* Top bar */}
                <div className={css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                    borderBottom: "1px solid",
                    borderColor: "neutral/8",
                })}>
                    <div className={css({
                        width: "100%",
                        maxWidth: "xl",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem"
                    })}>
                        <div className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem"
                        })}>
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={css({
                                    display: { base: "flex", lg: "none" },
                                    padding: "0.5rem",
                                    borderRadius: "md",
                                    color: "neutral/60",
                                    _hover: { backgroundColor: "neutral/5", color: "neutral" }
                                })}
                            >
                                {mobileMenuOpen
                                    ? <IconX className={css({ width: "1.25rem", height: "1.25rem" })} />
                                    : <IconMenu2 className={css({ width: "1.25rem", height: "1.25rem" })} />
                                }
                            </button>

                            <LinkButton to="/">
                                <Logo withText />
                            </LinkButton>

                            <span className={css({ color: "neutral/20", display: { base: "none", sm: "block" } })}>/</span>

                            <LinkButton to="/documentation" className={css({
                                display: { base: "none", sm: "flex" },
                                alignItems: "center",
                                gap: "0.25rem",
                                fontSize: "sm",
                                color: "neutral/60",
                                _hover: { color: "neutral" }
                            })}>
                                <ButtonContent
                                    variant="invisible"
                                    leftIcon={<IconBook2 />}
                                    text="Documentation"
                                />
                            </LinkButton>
                        </div>

                        <nav className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem"
                        })}>
                            <a
                                href="https://github.com/arrhes"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ButtonContent
                                    variant="invisible"
                                    leftIcon={<IconBrandGithub />}
                                />
                            </a>
                            {/* <LinkButton to="/">
                                <ButtonContent
                                    text="Retour au site"
                                />
                            </LinkButton> */}
                            <LinkButton
                                to="/dashboard"
                            >
                                <ButtonContent
                                    variant="primary"
                                    text="Dashboard"
                                />
                            </LinkButton>
                        </nav>
                    </div>
                </div>

                {/* Section tabs */}
                <div className={css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingX: "1rem",
                    paddingY: "0.5rem",
                    backgroundColor: "background",
                })}>
                    <div className={css({
                        width: "100%",
                        maxWidth: "xl",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        overflowX: "auto",
                    })}>
                        {Object.values(docSections).map((section) => (
                            <SectionTab
                                key={section.id}
                                section={section}
                                isActive={currentSectionId === section.id}
                            />
                        ))}
                    </div>
                </div>
            </header>

            <div className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                backgroundColor: "white",
                flex: "1"
            })}>
                <div className={css({
                    width: "100%",
                    maxWidth: "xl",
                    display: "flex",
                    flex: "1",
                })}>
                    {/* Mobile sidebar overlay */}
                    {mobileMenuOpen && (
                        <div
                            className={css({
                                display: { base: "block", lg: "none" },
                                position: "fixed",
                                inset: "0",
                                top: "120px",
                                backgroundColor: "neutral/50",
                                zIndex: "15"
                            })}
                            onClick={() => setMobileMenuOpen(false)}
                        />
                    )}

                    {/* Sidebar */}
                    <aside className={cx(
                        css({
                            width: "16rem",
                            borderRight: "1px solid",
                            borderRightColor: "neutral/10",
                            backgroundColor: "white",
                            position: "sticky",
                            top: "120px",
                            height: "calc(100vh - 120px)",
                            overflowY: "auto",
                            flexShrink: 0,
                            display: { base: "none", lg: "block" }
                        }),
                        mobileMenuOpen && css({
                            display: "block",
                            position: "fixed",
                            left: "0",
                            top: "120px",
                            zIndex: "16",
                            boxShadow: "lg"
                        })
                    )}>
                        <SidebarNavigation
                            navigation={currentSection.navigation}
                            pathname={pathname}
                            onItemClick={() => setMobileMenuOpen(false)}
                        />
                    </aside>

                    {/* Main content */}
                    <main className={css({
                        flex: "1",
                        minWidth: "0",
                        display: "flex",
                        justifyContent: "start"
                    })}>
                        <div className={css({
                            width: "100%",
                            paddingX: { base: "1rem", md: "2rem" },
                            paddingY: { base: "1.5rem", md: "2rem" },
                            paddingRight: { base: "1rem", md: "0" },
                        })}>
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
