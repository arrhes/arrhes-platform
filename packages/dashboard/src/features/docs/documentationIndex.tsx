import { css } from "../../utilities/cn.js"
import { IconBook, IconChevronRight, IconLayout } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { DocIndexLink } from "../../components/document/docIndexLink.js"


export function DocumentationIndex() {
    return (
        <div>
            <h1 className={css({
                fontSize: "3xl",
                fontWeight: "bold",
                mb: "4"
            })}>Documentation</h1>
            <p className={css({
                color: "neutral/70",
                mb: "8",
                fontSize: "lg"
            })}>
                Bienvenue dans la documentation d'Arrhes. Que vous soyez debutant en comptabilite
                ou que vous cherchiez a maitriser le logiciel, vous trouverez ici toutes les ressources necessaires.
            </p>

            <div className={css({
                display: "grid",
                gridTemplateColumns: { md: "2" },
                gap: "6"
            })}>
                {/* Cours de comptabilite */}
                <div className={css({
                    p: "6",
                    rounded: "lg",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    bg: "white"
                })}>
                    <div className={css({
                        w: "12",
                        h: "12",
                        rounded: "lg",
                        bg: "information/10",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: "4"
                    })}>
                        <IconBook className={css({ w: "6", h: "6", color: "information" })} />
                    </div>
                    <h2 className={css({
                        fontSize: "xl",
                        fontWeight: "semibold",
                        mb: "2"
                    })}>Cours de comptabilite</h2>
                    <p className={css({
                        fontSize: "sm",
                        color: "neutral/70",
                        mb: "4"
                    })}>
                        Apprenez les bases de la comptabilite francaise. Ce cours est concu pour les
                        personnes sans formation comptable qui souhaitent comprendre les principes essentiels.
                    </p>
                    <div className={css({ spaceY: "2", mb: "4" })}>
                        <DocIndexLink
                            to="/docs/comptabilite/introduction"
                            label="- Introduction a la comptabilite"
                        />
                        <DocIndexLink
                            to="/docs/comptabilite/comptes"
                            label="- Les comptes comptables"
                        />
                        <DocIndexLink
                            to="/docs/comptabilite/ecritures"
                            label="- Les ecritures comptables"
                        />
                        <DocIndexLink
                            to="/docs/comptabilite/documents"
                            label="- Les documents de synthese"
                        />
                    </div>
                    <Link
                        to="/docs/comptabilite/introduction"
                        className={css({
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "1",
                            fontSize: "sm",
                            fontWeight: "medium",
                            color: "primary",
                            _hover: { textDecoration: "underline" }
                        })}
                    >
                        Commencer le cours
                        <IconChevronRight className={css({ w: "4", h: "4" })} />
                    </Link>
                </div>

                {/* Guide d'utilisation */}
                <div className={css({
                    p: "6",
                    rounded: "lg",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    bg: "white"
                })}>
                    <div className={css({
                        w: "12",
                        h: "12",
                        rounded: "lg",
                        bg: "success/10",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: "4"
                    })}>
                        <IconLayout className={css({ w: "6", h: "6", color: "success" })} />
                    </div>
                    <h2 className={css({
                        fontSize: "xl",
                        fontWeight: "semibold",
                        mb: "2"
                    })}>Guide d'utilisation</h2>
                    <p className={css({
                        fontSize: "sm",
                        color: "neutral/70",
                        mb: "4"
                    })}>
                        Decouvrez comment utiliser Arrhes au quotidien. Ce guide vous accompagne
                        pas a pas dans la prise en main du logiciel.
                    </p>
                    <div className={css({ spaceY: "2", mb: "4" })}>
                        <DocIndexLink
                            to="/docs/guide/demarrage"
                            label="- Demarrer avec Arrhes"
                        />
                        <DocIndexLink
                            to="/docs/guide/organisations"
                            label="- Gerer les organisations"
                        />
                        <DocIndexLink
                            to="/docs/guide/ecritures"
                            label="- Saisir des ecritures"
                        />
                        <DocIndexLink
                            to="/docs/guide/rapports"
                            label="- Generer des rapports"
                        />
                    </div>
                    <Link
                        to="/docs/guide/demarrage"
                        className={css({
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "1",
                            fontSize: "sm",
                            fontWeight: "medium",
                            color: "primary",
                            _hover: { textDecoration: "underline" }
                        })}
                    >
                        Commencer le guide
                        <IconChevronRight className={css({ w: "4", h: "4" })} />
                    </Link>
                </div>
            </div>

            {/* Quick tip */}
            <div className={css({
                mt: "8",
                p: "4",
                rounded: "lg",
                bg: "warning/10",
                border: "1px solid",
                borderColor: "warning/20"
            })}>
                <p className={css({
                    fontSize: "sm",
                    color: "neutral/80"
                })}>
                    <strong>Conseil :</strong> Si vous n'avez jamais fait de comptabilite, nous vous recommandons
                    de commencer par le{" "}
                    <Link to="/docs/comptabilite/introduction" className={css({
                        color: "primary",
                        _hover: { textDecoration: "underline" }
                    })}>
                        cours de comptabilite
                    </Link>
                    {" "}avant de consulter le guide d'utilisation. Cela vous permettra de mieux comprendre
                    les concepts utilises dans le logiciel.
                </p>
            </div>
        </div>
    )
}
