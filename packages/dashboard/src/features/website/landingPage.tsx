import { ButtonContent } from "@arrhes/ui"
import { IconAbacus, IconBook, IconBrandGithub, IconChevronRight, IconCode, IconLock, IconUsers } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { css } from "../../utilities/cn.js"
import { FeatureCard } from "./featureCard.js"


export function LandingPage() {
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
                borderColor: "neutral/10"
            })}>
                <Link to="/" className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "2",
                    fontSize: "xl",
                    color: "neutral"
                })}>
                    <ButtonContent
                        variant="invisible"
                        icon={<IconAbacus />}
                    />
                    <span>Arrhes</span>
                </Link>
                <nav className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "6"
                })}>
                    <Link
                        to="/docs"
                        className={css({
                            fontSize: "sm",
                            color: "neutral/70",
                            _hover: { color: "neutral" },
                            transition: "colors"
                        })}
                    >
                        Documentation
                    </Link>
                    <a
                        href="https://github.com/arrhes/arrhes-platform"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ButtonContent
                            variant="invisible"
                            text="GitHub"
                            icon={<IconBrandGithub />}
                        />
                    </a>
                    <Link to="/dashboard">
                        <ButtonContent
                            variant="primary"
                            text="Acceder a l'application"
                        />
                    </Link>
                </nav>
            </header>

            {/* Hero Section */}
            <section className={css({
                w: "full",
                px: "6",
                py: "24",
                display: "flex",
                flexDir: "column",
                alignItems: "center",
                textAlign: "center",
                bgGradient: "to-b",
                gradientFrom: "background",
                gradientTo: "neutral/5"
            })}>
                <h1 className={css({
                    fontSize: { base: "4xl", md: "5xl" },
                    fontWeight: "bold",
                    color: "neutral",
                    maxW: "3xl",
                    lineHeight: "tight"
                })}>
                    Logiciel de comptabilite
                    <span className={css({ color: "primary" })}> open source</span>
                </h1>
                <p className={css({
                    mt: "6",
                    fontSize: "lg",
                    color: "neutral/70",
                    maxW: "2xl"
                })}>
                    Arrhes est un logiciel de comptabilite moderne, gratuit et open source.
                    Concu pour les associations et les petites entreprises francaises.
                </p>
                <div className={css({
                    mt: "10",
                    display: "flex",
                    alignItems: "center",
                    gap: "4"
                })}>
                    <Link to="/dashboard">
                        <ButtonContent
                            variant="primary"
                            text="Commencer gratuitement"
                            rightIcon={<IconChevronRight />}
                        />
                    </Link>
                    <Link to="/docs">
                        <ButtonContent
                            variant="default"
                            text="Lire la documentation"
                        />
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className={css({
                w: "full",
                px: "6",
                py: "20"
            })}>
                <div className={css({
                    maxW: "5xl",
                    mx: "auto"
                })}>
                    <h2 className={css({
                        fontSize: "2xl",
                        fontWeight: "semibold",
                        textAlign: "center",
                        mb: "12"
                    })}>
                        Pourquoi choisir Arrhes ?
                    </h2>
                    <div className={css({
                        display: "grid",
                        gridTemplateColumns: { md: "3" },
                        gap: "8"
                    })}>
                        <FeatureCard
                            icon={<IconCode className={css({ w: "6", h: "6" })} />}
                            title="Open Source"
                            description="Code source ouvert et transparent. Vous pouvez auditer, modifier et contribuer au projet."
                        />
                        <FeatureCard
                            icon={<IconLock className={css({ w: "6", h: "6" })} />}
                            title="Vos donnees vous appartiennent"
                            description="Hebergez vous-meme ou utilisez notre service. Vos donnees restent sous votre controle."
                        />
                        <FeatureCard
                            icon={<IconUsers className={css({ w: "6", h: "6" })} />}
                            title="Multi-organisations"
                            description="Gerez plusieurs associations ou entreprises depuis un seul compte utilisateur."
                        />
                    </div>
                </div>
            </section>

            {/* Documentation CTA */}
            <section className={css({
                w: "full",
                px: "6",
                py: "16",
                bg: "neutral/5"
            })}>
                <div className={css({
                    maxW: "3xl",
                    mx: "auto",
                    textAlign: "center"
                })}>
                    <IconBook className={css({
                        w: "12",
                        h: "12",
                        color: "neutral/50",
                        mx: "auto",
                        mb: "4"
                    })} />
                    <h2 className={css({
                        fontSize: "2xl",
                        fontWeight: "semibold",
                        mb: "4"
                    })}>
                        Nouveau en comptabilite ?
                    </h2>
                    <p className={css({
                        color: "neutral/70",
                        mb: "6"
                    })}>
                        Notre documentation inclut un cours complet sur les bases de la comptabilite.
                        Apprenez les concepts essentiels avant d'utiliser le logiciel.
                    </p>
                    <Link to="/docs/comptabilite/introduction">
                        <ButtonContent
                            variant="default"
                            text="Decouvrir le cours de comptabilite"
                            rightIcon={<IconChevronRight />}
                        />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className={css({
                w: "full",
                px: "6",
                py: "8",
                borderTop: "1px solid",
                borderColor: "neutral/10",
                mt: "auto"
            })}>
                <div className={css({
                    maxW: "5xl",
                    mx: "auto",
                    display: "flex",
                    flexDir: { base: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "4"
                })}>
                    <span className={css({
                        fontSize: "sm",
                        color: "neutral/50"
                    })}>
                        Arrhes - Logiciel de comptabilite open source
                    </span>
                    <div className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "6"
                    })}>
                        <Link
                            to="/docs"
                            className={css({
                                fontSize: "sm",
                                color: "neutral/50",
                                _hover: { color: "neutral" },
                                transition: "colors"
                            })}
                        >
                            Documentation
                        </Link>
                        <a
                            href="https://github.com/arrhes/arrhes-platform"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css({
                                fontSize: "sm",
                                color: "neutral/50",
                                _hover: { color: "neutral" },
                                transition: "colors"
                            })}
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
