import { ButtonContent } from "@arrhes/ui"
import { IconAbacus, IconBook, IconHome, IconLayout } from "@tabler/icons-react"
import { Link, Outlet, useRouterState } from "@tanstack/react-router"
import { css, cx } from "../../utilities/cn.js"


const navigationItems = {
    comptabilite: {
        title: "Cours de comptabilite",
        icon: <IconBook className={css({ w: "4", h: "4" })} />,
        items: [
            { path: "/docs/comptabilite/introduction", label: "Introduction" },
            { path: "/docs/comptabilite/comptes", label: "Les comptes" },
            { path: "/docs/comptabilite/ecritures", label: "Les ecritures" },
            { path: "/docs/comptabilite/documents", label: "Les documents" },
        ]
    },
    guide: {
        title: "Guide d'utilisation",
        icon: <IconLayout className={css({ w: "4", h: "4" })} />,
        items: [
            { path: "/docs/guide/demarrage", label: "Demarrage" },
            { path: "/docs/guide/organisations", label: "Organisations" },
            { path: "/docs/guide/ecritures", label: "Saisie des ecritures" },
            { path: "/docs/guide/rapports", label: "Rapports" },
        ]
    }
}


export function DocumentationLayout() {
    const pathname = useRouterState({ select: (s) => s.location.pathname })

    return (
        <div className={css({
            w: "full",
            minH: "screen",
            display: "flex",
            flexDir: "column"
        })}>
            {/* Header */}
            <header className={css({
                w: "full",
                px: "6",
                py: "4",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid",
                borderColor: "neutral/10",
                bg: "white",
                position: "sticky",
                top: "0",
                zIndex: "10"
            })}>
                <div className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "4"
                })}>
                    <Link to="/" className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "2",
                        fontSize: "xl",
                        fontWeight: "semibold",
                        color: "neutral"
                    })}>
                        <IconAbacus className={css({ w: "5", h: "5" })} />
                        <span>Arrhes</span>
                    </Link>
                    <span className={css({ color: "neutral/30" })}>/</span>
                    <Link to="/docs" className={css({
                        fontSize: "sm",
                        color: "neutral/70",
                        _hover: { color: "neutral" }
                    })}>
                        Documentation
                    </Link>
                </div>
                <Link to="/dashboard">
                    <ButtonContent
                        variant="primary"
                        text="Acceder a l'application"
                    />
                </Link>
            </header>

            <div className={css({ display: "flex", flex: "1" })}>
                {/* Sidebar */}
                <aside className={css({
                    w: "64",
                    borderRight: "1px solid",
                    borderColor: "neutral/10",
                    p: "4",
                    bg: "white",
                    position: "sticky",
                    top: "57px",
                    h: "calc(100vh - 57px)",
                    overflowY: "auto"
                })}>
                    <nav className={css({
                        display: "flex",
                        flexDir: "column",
                        gap: "6"
                    })}>
                        <Link
                            to="/docs"
                            className={cx(
                                css({
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "2",
                                    px: "3",
                                    py: "2",
                                    rounded: "md",
                                    fontSize: "sm",
                                    transition: "colors"
                                }),
                                css(pathname === "/docs"
                                    ? { bg: "neutral/10", color: "neutral", fontWeight: "medium" }
                                    : { color: "neutral/70", _hover: { bg: "neutral/5" } }
                                )
                            )}
                        >
                            <IconHome className={css({ w: "4", h: "4" })} />
                            Accueil
                        </Link>

                        {Object.entries(navigationItems).map(([key, section]) => (
                            <div key={key}>
                                <div className={css({
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "2",
                                    px: "3",
                                    py: "2",
                                    fontSize: "xs",
                                    fontWeight: "medium",
                                    color: "neutral/50",
                                    textTransform: "uppercase",
                                    letterSpacing: "wider"
                                })}>
                                    {section.icon}
                                    {section.title}
                                </div>
                                <div className={css({
                                    mt: "1",
                                    display: "flex",
                                    flexDir: "column",
                                    gap: "1"
                                })}>
                                    {section.items.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={cx(
                                                css({
                                                    px: "3",
                                                    py: "2",
                                                    rounded: "md",
                                                    fontSize: "sm",
                                                    transition: "colors"
                                                }),
                                                css(pathname === item.path
                                                    ? { bg: "neutral/10", color: "neutral", fontWeight: "medium" }
                                                    : { color: "neutral/70", _hover: { bg: "neutral/5" } }
                                                )
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Main content */}
                <main className={css({
                    flex: "1",
                    p: "8",
                    maxW: "4xl"
                })}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
