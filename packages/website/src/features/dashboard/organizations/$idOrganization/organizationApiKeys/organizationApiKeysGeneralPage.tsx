import { css } from "@arrhes/ui/utilities/cn.js"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../../components/layouts/settingsSection/settingsSection.tsx"

export function OrganizationApiKeysGeneralPage() {
    return (
        <Page.Root>
            <Page.Content>
                <SettingsSection.Root>
                    <SettingsSection.Header title="API REST" />
                    <SettingsSection.Row
                        title="Accès à l'API"
                        description="L'API REST permet d'intégrer Arrhes à vos outils et automatiser vos opérations comptables."
                    >
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                                fontSize: "sm",
                                color: "neutral/70",
                            })}
                        >
                            <p>Vous pouvez accéder à l'API de deux manières :</p>
                            <ul
                                className={css({
                                    listStyleType: "disc",
                                    paddingLeft: "1.25rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.25rem",
                                })}
                            >
                                <li>
                                    <span className={css({ fontWeight: "medium", color: "neutral" })}>
                                        Session utilisateur
                                    </span>{" "}
                                    — en vous connectant via l'interface web, aucune clé n'est nécessaire.
                                </li>
                                <li>
                                    <span className={css({ fontWeight: "medium", color: "neutral" })}>Clé API</span> —
                                    pour les intégrations automatisées, créez une clé dans l'onglet{" "}
                                    <span className={css({ fontWeight: "medium" })}>Clés</span>.
                                </li>
                            </ul>
                        </div>
                    </SettingsSection.Row>
                    <SettingsSection.Row
                        title="Authentification par clé API"
                        description="Ajoutez l'en-tête Authorization à vos requêtes HTTP."
                    >
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                                fontSize: "sm",
                                color: "neutral/70",
                            })}
                        >
                            <code
                                className={css({
                                    padding: "0.5rem 0.75rem",
                                    backgroundColor: "neutral/5",
                                    borderRadius: "0.375rem",
                                    fontFamily: "monospace",
                                    fontSize: "xs",
                                    color: "neutral",
                                })}
                            >
                                Authorization: Bearer &lt;votre_clé_api&gt;
                            </code>
                        </div>
                    </SettingsSection.Row>
                    <SettingsSection.Row
                        title="Documentation"
                        description="Consultez la documentation complète de l'API pour découvrir les endpoints disponibles."
                    >
                        <a
                            href="/documentation"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css({
                                fontSize: "sm",
                                fontWeight: "medium",
                                color: "primary",
                                textDecoration: "underline",
                                cursor: "pointer",
                            })}
                        >
                            Accéder à la documentation
                        </a>
                    </SettingsSection.Row>
                </SettingsSection.Root>
            </Page.Content>
        </Page.Root>
    )
}
