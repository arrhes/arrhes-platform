import { IconBook, IconBrandGithub, IconMail } from "@tabler/icons-react"
import { LinkButton } from "../../../components/linkButton.js"
import { css } from "../../../utilities/cn.js"


export function Support() {
    return (
        <div className={css({
            display: "flex",
            flexDirection: "column",
            gap: "2rem"
        })}>
            {/* Page header */}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
            })}>
                <h1 className={css({
                    fontSize: "lg",
                    fontWeight: "bold",
                    color: "neutral",
                })}>
                    Support
                </h1>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    Besoin d'aide ? Nous sommes là pour vous accompagner.
                </p>
            </div>

            {/* Contact cards */}
            <div className={css({
                display: "grid",
                gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
                gap: "1rem",
            })}>
                {/* Email support */}
                <a
                    href="mailto:support@arrhes.com"
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                        padding: "1.5rem",
                        borderRadius: "lg",
                        border: "1px solid",
                        borderColor: "neutral/10",
                        backgroundColor: "white",
                        transition: "all",
                        _hover: {
                            borderColor: "primary/30",
                            backgroundColor: "primary/5",
                        }
                    })}
                >
                    <div className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                    })}>
                        <div className={css({
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "md",
                            backgroundColor: "primary/10",
                        })}>
                            <IconMail className={css({
                                width: "1.25rem",
                                height: "1.25rem",
                                color: "primary",
                            })} />
                        </div>
                        <h2 className={css({
                            fontSize: "md",
                            fontWeight: "semibold",
                            color: "neutral",
                        })}>
                            Email
                        </h2>
                    </div>
                    <p className={css({
                        fontSize: "sm",
                        color: "neutral/60",
                        lineHeight: "relaxed",
                    })}>
                        Contactez notre équipe par email pour toute question ou demande d'assistance.
                    </p>
                    <span className={css({
                        fontSize: "sm",
                        fontWeight: "medium",
                        color: "primary",
                    })}>
                        support@arrhes.com
                    </span>
                </a>

                {/* GitHub */}
                <a
                    href="https://github.com/arrhes/arrhes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                        padding: "1.5rem",
                        borderRadius: "lg",
                        border: "1px solid",
                        borderColor: "neutral/10",
                        backgroundColor: "white",
                        transition: "all",
                        _hover: {
                            borderColor: "neutral/30",
                            backgroundColor: "neutral/5",
                        }
                    })}
                >
                    <div className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                    })}>
                        <div className={css({
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "md",
                            backgroundColor: "neutral/10",
                        })}>
                            <IconBrandGithub className={css({
                                width: "1.25rem",
                                height: "1.25rem",
                                color: "neutral",
                            })} />
                        </div>
                        <h2 className={css({
                            fontSize: "md",
                            fontWeight: "semibold",
                            color: "neutral",
                        })}>
                            GitHub
                        </h2>
                    </div>
                    <p className={css({
                        fontSize: "sm",
                        color: "neutral/60",
                        lineHeight: "relaxed",
                    })}>
                        Signalez un bug, proposez une amélioration ou consultez le code source.
                    </p>
                    <span className={css({
                        fontSize: "sm",
                        fontWeight: "medium",
                        color: "neutral/70",
                    })}>
                        github.com/arrhes/arrhes
                    </span>
                </a>
            </div>

            {/* Documentation section */}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            })}>
                <h2 className={css({
                    fontSize: "md",
                    fontWeight: "semibold",
                    color: "neutral",
                })}>
                    Ressources utiles
                </h2>

                <div className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                })}>
                    <LinkButton
                        to="/documentation/dashboard"
                        className={css({
                            width: "100%",
                            gap: "0.75rem",
                            padding: "1rem",
                            borderRadius: "lg",
                            border: "1px solid",
                            borderColor: "neutral/10",
                            backgroundColor: "white",
                            transition: "all",
                            _hover: {
                                borderColor: "neutral/20",
                                backgroundColor: "neutral/3",
                            }
                        })}
                    >
                        <IconBook className={css({
                            width: "1.25rem",
                            height: "1.25rem",
                            color: "neutral/60",
                        })} />
                        <div>
                            <p className={css({
                                fontSize: "sm",
                                fontWeight: "medium",
                                color: "neutral",
                            })}>
                                Guide d'utilisation
                            </p>
                            <p className={css({
                                fontSize: "xs",
                                color: "neutral/50",
                            })}>
                                Apprenez à utiliser Arrhes efficacement
                            </p>
                        </div>
                    </LinkButton>

                    <LinkButton
                        to="/documentation/comptabilite"
                        className={css({
                            width: "100%",
                            gap: "0.75rem",
                            padding: "1rem",
                            borderRadius: "lg",
                            border: "1px solid",
                            borderColor: "neutral/10",
                            backgroundColor: "white",
                            transition: "all",
                            _hover: {
                                borderColor: "neutral/20",
                                backgroundColor: "neutral/3",
                            }
                        })}
                    >
                        <IconBook className={css({
                            width: "1.25rem",
                            height: "1.25rem",
                            color: "neutral/60",
                        })} />
                        <div>
                            <p className={css({
                                fontSize: "sm",
                                fontWeight: "medium",
                                color: "neutral",
                            })}>
                                Cours de comptabilité
                            </p>
                            <p className={css({
                                fontSize: "xs",
                                color: "neutral/50",
                            })}>
                                Les bases de la comptabilité expliquées simplement
                            </p>
                        </div>
                    </LinkButton>
                </div>
            </div>

            {/* Response time info */}
            <div className={css({
                padding: "1rem",
                borderRadius: "md",
                backgroundColor: "neutral/5",
                fontSize: "sm",
                color: "neutral/60",
            })}>
                Nous nous efforçons de répondre à toutes les demandes dans un délai de 48 heures ouvrées.
            </div>
        </div>
    )
}
