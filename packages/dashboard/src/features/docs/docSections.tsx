import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBook, IconGavel, IconHeadset, IconHome, IconInfoCircle, IconLayout } from "@tabler/icons-react"
import { DocSection } from "./components/sectionTab.tsx"


export // Documentation sections configuration
    const docSections: Record<string, DocSection> = {
        general: {
            id: "general",
            label: "Général",
            path: "/documentation",
            icon: <IconInfoCircle />,
            navigation: {
                introduction: {
                    title: "Introduction",
                    icon: <IconHome className={css({ width: "1rem", height: "1rem" })} />,
                    items: [
                        { path: "/documentation", label: "Accueil" },
                        { path: "/documentation/fonctionnalites", label: "Fonctionnalités" },
                        { path: "/documentation/tarifs", label: "Tarifs" },
                        { path: "/documentation/support", label: "Support" },
                    ]
                },
                legal: {
                    title: "Légal",
                    icon: <IconGavel className={css({ width: "1rem", height: "1rem" })} />,
                    items: [
                        { path: "/documentation/mentions-legales", label: "Mentions légales" },
                        { path: "/documentation/cgu", label: "Conditions Générales d'Utilisation" },
                        { path: "/documentation/confidentialite", label: "Politique de confidentialité" },
                    ]
                }
            }
        },
        comptabilite: {
            id: "comptabilite",
            label: "Comptabilité",
            path: "/documentation/comptabilite",
            icon: <IconBook />,
            navigation: {
                cours: {
                    title: "Cours de comptabilité",
                    icon: <IconBook className={css({ width: "1rem", height: "1rem" })} />,
                    items: [
                        { path: "/documentation/comptabilite", label: "Introduction" },
                        { path: "/documentation/comptabilite/comptes", label: "Les comptes" },
                        { path: "/documentation/comptabilite/ecritures", label: "Les écritures" },
                        { path: "/documentation/comptabilite/documents", label: "Les documents" },
                    ]
                }
            }
        },
        dashboard: {
            id: "dashboard",
            label: "Dashboard",
            path: "/documentation/dashboard",
            icon: <IconLayout />,
            navigation: {
                guide: {
                    title: "Guide d'utilisation",
                    icon: <IconLayout className={css({ width: "1rem", height: "1rem" })} />,
                    items: [
                        { path: "/documentation/dashboard", label: "Accueil" },
                        { path: "/documentation/dashboard/demarrage", label: "Démarrage" },
                        { path: "/documentation/dashboard/organisations", label: "Organisations" },
                        { path: "/documentation/dashboard/ecritures", label: "Saisie des écritures" },
                        { path: "/documentation/dashboard/rapports", label: "Rapports" },
                    ]
                }
            }
        },
        // api: {
        //     id: "api",
        //     label: "API",
        //     path: "/documentation/api",
        //     icon: <IconCode />,
        //     navigation: {
        //         api: {
        //             title: "API REST",
        //             icon: <IconCode className={css({ width: "1rem", height: "1rem" })} />,
        //             items: [
        //                 { path: "/documentation/api", label: "Présentation" },
        //             ]
        //         }
        //     }
        // },
        // ai: {
        //     id: "ai",
        //     label: "Assistant IA",
        //     path: "/documentation/ai",
        //     icon: <IconRobot />,
        //     navigation: {
        //         assistant: {
        //             title: "Assistant IA",
        //             icon: <IconRobot className={css({ width: "1rem", height: "1rem" })} />,
        //             items: [
        //                 { path: "/documentation/ai", label: "Introduction" },
        //                 { path: "/documentation/ai/assistant", label: "Assistant comptable" },
        //                 { path: "/documentation/ai/analyse", label: "Analyse des données" },
        //             ]
        //         }
        //     }
        // }
    }